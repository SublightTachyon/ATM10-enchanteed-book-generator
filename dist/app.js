const ENCHANTMENTS = [
  ["apothic_enchanting:berserkers_fury",3],["apothic_enchanting:boon_of_the_earth",5],["apothic_enchanting:chainsaw",1],["apothic_enchanting:chromatic",1],["apothic_enchanting:crescendo_of_bolts",5],["apothic_enchanting:endless_quiver",1],["apothic_enchanting:growth_serum",1],["apothic_enchanting:icy_thorns",5],["apothic_enchanting:infusion",1],["apothic_enchanting:knowledge_of_the_ages",3],["apothic_enchanting:life_mending",3],["apothic_enchanting:miners_fervor",1],["apothic_enchanting:natures_blessing",7],["apothic_enchanting:rebounding",5],["apothic_enchanting:reflective_defenses",7],["apothic_enchanting:scavenger",3],["apothic_enchanting:shield_bash",7],["apothic_enchanting:stable_footing",1],["apothic_enchanting:tempting",1],["apothic_enchanting:worker_exploitation",1],
  ["apothic_spawners:capturing",7],["ars_elemental:mirror_shield",7],["ars_elemental:soulbound",1],["ars_nouveau:mana_boost",7],["ars_nouveau:mana_regen",7],["ars_nouveau:reactive",8],["deeperdarker:catalysis",5],["deeperdarker:sculk_smite",10],["dungeons_arise:discharge",5],["dungeons_arise:ensnaring",6],["dungeons_arise:lolths_curse",1],["dungeons_arise:purification",4],["dungeons_arise:voltaic_shot",1],["eternal_starlight:fearless",6],["eternal_starlight:poisoning",8],["eternal_starlight:soul_snatcher",5],["evilcraft:breaking",8],["evilcraft:life_stealing",6],["evilcraft:poison_tip",7],["evilcraft:unusing",1],["evilcraft:vengeance",8],["farmersdelight:backstabbing",8],["forbidden_arcanus:soul_looting",8],["minecolonies:raider_damage_enchant",6],
  ["minecraft:aqua_affinity",1],["minecraft:bane_of_arthropods",10],["minecraft:binding_curse",1],["minecraft:blast_protection",9],["minecraft:breach",8],["minecraft:channeling",1],["minecraft:density",10],["minecraft:depth_strider",7],["minecraft:efficiency",9],["minecraft:feather_falling",11],["minecraft:fire_aspect",5],["minecraft:fire_protection",9],["minecraft:flame",1],["minecraft:fortune",8],["minecraft:frost_walker",7],["minecraft:impaling",10],["minecraft:infinity",1],["minecraft:knockback",5],["minecraft:looting",8],["minecraft:loyalty",9],["minecraft:luck_of_the_sea",8],["minecraft:lure",8],["minecraft:mending",1],["minecraft:multishot",1],["minecraft:piercing",8],["minecraft:power",9],["minecraft:projectile_protection",11],["minecraft:protection",8],["minecraft:punch",5],["minecraft:quick_charge",5],["minecraft:respiration",7],["minecraft:riptide",9],["minecraft:sharpness",9],["minecraft:silk_touch",1],["minecraft:smite",10],["minecraft:soul_speed",7],["minecraft:sweeping_edge",8],["minecraft:swift_sneak",5],["minecraft:thorns",5],["minecraft:unbreaking",8],["minecraft:vanishing_curse",1],["minecraft:wind_burst",8],
  ["mysticalagriculture:mystical_enlightenment",9],["mysticalagriculture:soul_siphoner",9],["quarryplus:quarry_pickaxe",1],["railcraft:destruction",7],["railcraft:implosion",10],["railcraft:smack",9],["railcraft:wrecking",9],["reliquary:severing",9],["supplementaries:stasis",1],["the_bumblezone:comb_cutter",3],["the_bumblezone:neurotoxins",13],["the_bumblezone:potent_poison",11],["tombstone:blessing",13],["tombstone:curse_of_bones",13],["tombstone:decrepitude",13],["tombstone:frostbite",13],["tombstone:incurable_wounds",13],["tombstone:magic_siphon",13],["tombstone:plague_bringer",13],["tombstone:ruthless_strike",13],["tombstone:sanctified",13],["tombstone:soulbound",1],["tombstone:spectral_bite",13],["tombstone:spectral_conjurer",13],["twilightforest:chill_aura",8],["twilightforest:destruction",8],["twilightforest:fire_react",8],["twilightforest:renewal",1],["undergarden:longevity",7],["undergarden:ricochet",7],["undergarden:self_sling",1]
];

const MOD_NAMES = {
  apothic_enchanting: "Apothic Enchanting", apothic_spawners: "Apothic Spawners",
  ars_elemental: "Ars Elemental", ars_nouveau: "Ars Nouveau", deeperdarker: "Deeper and Darker",
  dungeons_arise: "When Dungeons Arise", eternal_starlight: "Eternal Starlight", evilcraft: "EvilCraft",
  farmersdelight: "Farmer's Delight", forbidden_arcanus: "Forbidden & Arcanus", minecolonies: "MineColonies",
  minecraft: "Minecraft", mysticalagriculture: "Mystical Agriculture", quarryplus: "Additional Enchanted Miner",
  railcraft: "Railcraft Reborn", reliquary: "Reliquary", supplementaries: "Supplementaries",
  the_bumblezone: "The Bumblezone", tombstone: "Corail Tombstone", twilightforest: "The Twilight Forest",
  undergarden: "The Undergarden"
};

const ROMAN = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
const data = ENCHANTMENTS.map(([id, max]) => {
  const [namespace, path] = id.split(":");
  const name = path.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    .replace("Lolths", "Lolth's").replace("Natures", "Nature's");
  return { id, max, namespace, mod: MOD_NAMES[namespace] || namespace, name };
}).sort((a, b) => a.name.localeCompare(b.name));

const selected = new Map();
const els = {
  list: document.querySelector("#enchantment-list"), selectedList: document.querySelector("#selected-list"),
  selectedEmpty: document.querySelector("#selected-empty"), count: document.querySelector("#selection-count"),
  search: document.querySelector("#search-input"), filter: document.querySelector("#mod-filter"),
  resultCount: document.querySelector("#result-count"), empty: document.querySelector("#empty-state"),
  overMax: document.querySelector("#over-max"), target: document.querySelector("#target-select"),
  itemCount: document.querySelector("#count-input"), command: document.querySelector("#command-output"),
  copy: document.querySelector("#copy-button"), reset: document.querySelector("#reset-button"),
  selectVisible: document.querySelector("#select-visible"), conflict: document.querySelector("#conflict-box"),
  conflictText: document.querySelector("#conflict-text"), toast: document.querySelector("#toast")
};

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
}

function maxText(max) { return ROMAN[max] || String(max); }

function filteredData() {
  const query = els.search.value.trim().toLowerCase();
  const namespace = els.filter.value;
  return data.filter(item => (namespace === "all" || item.namespace === namespace) &&
    (!query || `${item.name} ${item.id} ${item.mod}`.toLowerCase().includes(query)));
}

function renderCatalog() {
  const visible = filteredData();
  els.resultCount.textContent = `Showing ${visible.length} enchantment${visible.length === 1 ? "" : "s"}`;
  els.empty.hidden = visible.length !== 0;
  els.list.hidden = visible.length === 0;
  els.selectVisible.textContent = visible.length && visible.every(item => selected.has(item.id)) ? "Clear visible" : "Select visible";
  els.list.innerHTML = visible.map(item => {
    const active = selected.has(item.id);
    return `<button class="enchant-row" type="button" role="listitem" aria-pressed="${active}" data-id="${item.id}">
      <span class="check-pixel" aria-hidden="true">${active ? "✓" : ""}</span>
      <span class="enchant-main"><b>${escapeHTML(item.name)}</b><small>${item.id}</small></span>
      <span class="enchant-side"><span class="mod-badge">${escapeHTML(item.mod)}</span><span class="max-label">MAX ${maxText(item.max)}</span></span>
    </button>`;
  }).join("");
}

function renderSelected() {
  const items = [...selected.values()];
  els.selectedEmpty.hidden = items.length > 0;
  els.selectedList.hidden = items.length === 0;
  els.count.textContent = `${items.length} selected`;
  els.selectedList.innerHTML = items.map(item => `<div class="selected-item" data-selected-id="${item.id}">
    <span class="selected-name"><b>${escapeHTML(item.name)}</b><small>${item.id} · pack max ${maxText(item.max)}</small></span>
    <span class="level-control">
      <button type="button" data-action="down" aria-label="Decrease ${escapeHTML(item.name)} level">−</button>
      <input type="number" min="1" max="${els.overMax.checked ? 255 : item.max}" value="${item.level}" aria-label="${escapeHTML(item.name)} level" />
      <button type="button" data-action="up" aria-label="Increase ${escapeHTML(item.name)} level">+</button>
    </span>
    <button class="remove-button" type="button" data-action="remove" aria-label="Remove ${escapeHTML(item.name)}">×</button>
  </div>`).join("");
  renderCommand();
  renderConflicts();
}

function renderCommand() {
  const target = els.target.value;
  const count = Math.max(1, Math.min(64, Number.parseInt(els.itemCount.value, 10) || 1));
  const entries = [...selected.values()].map(item => `'${item.id}':${item.level}`).join(",");
  els.command.textContent = entries
    ? `/give ${target} minecraft:enchanted_book[minecraft:stored_enchantments={${entries}}] ${count}`
    : `/give ${target} minecraft:enchanted_book ${count}`;
}

const CONFLICT_GROUPS = [
  ["minecraft:protection","minecraft:fire_protection","minecraft:blast_protection","minecraft:projectile_protection"],
  ["minecraft:sharpness","minecraft:smite","minecraft:bane_of_arthropods"],
  ["minecraft:depth_strider","minecraft:frost_walker"], ["minecraft:infinity","minecraft:mending"],
  ["minecraft:multishot","minecraft:piercing"], ["minecraft:riptide","minecraft:loyalty"],
  ["minecraft:riptide","minecraft:channeling"], ["minecraft:density","minecraft:breach"]
];

function renderConflicts() {
  const conflicts = CONFLICT_GROUPS.map(group => group.filter(id => selected.has(id))).filter(group => group.length > 1);
  els.conflict.hidden = conflicts.length === 0;
  els.conflictText.textContent = conflicts.map(group => group.map(id => data.find(x => x.id === id).name).join(" + ")).join("; ");
}

function toggleItem(id) {
  const item = data.find(entry => entry.id === id);
  if (!item) return;
  if (selected.has(id)) selected.delete(id);
  else selected.set(id, { ...item, level: item.max });
  renderCatalog();
  renderSelected();
}

function populateFilters() {
  [...new Set(data.map(item => item.namespace))].sort((a,b) => MOD_NAMES[a].localeCompare(MOD_NAMES[b])).forEach(namespace => {
    const option = document.createElement("option");
    option.value = namespace;
    option.textContent = `${MOD_NAMES[namespace]} (${data.filter(item => item.namespace === namespace).length})`;
    els.filter.append(option);
  });
}

els.list.addEventListener("click", event => {
  const row = event.target.closest("[data-id]");
  if (row) toggleItem(row.dataset.id);
});
els.search.addEventListener("input", renderCatalog);
els.filter.addEventListener("change", renderCatalog);
els.selectVisible.addEventListener("click", () => {
  const visible = filteredData();
  const allSelected = visible.length && visible.every(item => selected.has(item.id));
  visible.forEach(item => allSelected ? selected.delete(item.id) : selected.set(item.id, { ...item, level: item.max }));
  renderCatalog(); renderSelected();
});
els.selectedList.addEventListener("click", event => {
  const row = event.target.closest("[data-selected-id]");
  const action = event.target.dataset.action;
  if (!row || !action) return;
  const item = selected.get(row.dataset.selectedId);
  if (action === "remove") { selected.delete(item.id); renderCatalog(); renderSelected(); return; }
  const cap = els.overMax.checked ? 255 : item.max;
  item.level = Math.max(1, Math.min(cap, item.level + (action === "up" ? 1 : -1)));
  renderSelected();
});
els.selectedList.addEventListener("change", event => {
  const row = event.target.closest("[data-selected-id]");
  if (!row || event.target.tagName !== "INPUT") return;
  const item = selected.get(row.dataset.selectedId);
  const cap = els.overMax.checked ? 255 : item.max;
  item.level = Math.max(1, Math.min(cap, Number.parseInt(event.target.value, 10) || 1));
  renderSelected();
});
els.overMax.addEventListener("change", () => {
  if (!els.overMax.checked) selected.forEach(item => item.level = Math.min(item.level, item.max));
  renderSelected();
});
[els.target, els.itemCount].forEach(el => el.addEventListener("change", () => { if (el === els.itemCount) el.value = Math.max(1, Math.min(64, Number.parseInt(el.value, 10) || 1)); renderCommand(); }));
els.itemCount.addEventListener("input", renderCommand);
els.copy.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(els.command.textContent); }
  catch { const range = document.createRange(); range.selectNodeContents(els.command); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); document.execCommand("copy"); selection.removeAllRanges(); }
  els.copy.classList.add("copied"); els.copy.querySelector("span").textContent = "Copied!"; els.toast.classList.add("show");
  window.setTimeout(() => { els.copy.classList.remove("copied"); els.copy.querySelector("span").textContent = "Copy command"; els.toast.classList.remove("show"); }, 1800);
});
els.reset.addEventListener("click", () => {
  selected.clear(); els.search.value = ""; els.filter.value = "all"; els.overMax.checked = false; els.target.value = "@p"; els.itemCount.value = 1;
  renderCatalog(); renderSelected();
});
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== els.search && !["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault(); els.search.focus();
  }
});

populateFilters();
renderCatalog();
renderSelected();
