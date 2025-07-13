const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");

// Output elements
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesDiv = document.getElementById("types");
const hpEl = document.getElementById("hp");
const atkEl = document.getElementById("attack");
const defEl = document.getElementById("defense");
const spAtkEl = document.getElementById("special-attack");
const spDefEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

btn.addEventListener("click", async () => {
  const query = input.value.trim().toLowerCase();
  if (!query) {
    alert("Creature not found");
    return;
  }

  try {
    const res = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`
    );
    if (!res.ok) throw new Error("Creature not found");

    const data = await res.json();

    // Populate fields
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    hpEl.textContent = data.stats.find((s) => s.name === "hp").base_stat;
    atkEl.textContent = data.stats.find((s) => s.name === "attack").base_stat;
    defEl.textContent = data.stats.find((s) => s.name === "defense").base_stat;
    spAtkEl.textContent = data.stats.find((s) => s.name === "special-attack").base_stat;
    spDefEl.textContent = data.stats.find((s) => s.name === "special-defense").base_stat;
    speedEl.textContent = data.stats.find((s) => s.name === "speed").base_stat;

    // Render types
    typesDiv.innerHTML = "";
    data.types.forEach((t) => {
      const el = document.createElement("span");
      el.textContent = t.name.toUpperCase();
      typesDiv.appendChild(el);
    });
  } catch (err) {
    alert("Creature not found");
    // Clear previous results
    creatureName.textContent = "";
    creatureId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    typesDiv.innerHTML = "";
    hpEl.textContent = "";
    atkEl.textContent = "";
    defEl.textContent = "";
    spAtkEl.textContent = "";
    spDefEl.textContent = "";
    speedEl.textContent = "";
  }
});
