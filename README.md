# ATM10 Enchanted Book Generator

A dependency-free enchanted-book command generator for All the Mods 10 on
Minecraft Java 1.21.1.

The catalog is generated from ATM10's official
`config/apotheosis/enchantments.cfg` registry snapshot and currently includes
117 command-addressable enchantments across 21 namespaces.

## Run locally

Serve `dist/` with any static server, for example:

```bash
python3 -m http.server 8000 -d dist
```

Then open `http://localhost:8000`.

## Data source

- https://github.com/AllTheMods/ATM-10
- https://github.com/AllTheMods/ATM-10/blob/main/config/apotheosis/enchantments.cfg

This is a fan-made utility and is not affiliated with Mojang, Microsoft, or
the All the Mods team.
