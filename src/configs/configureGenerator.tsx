import { ProfileNameGenerator } from "@src/libs/generators/name";

const profileNameGenerators = new ProfileNameGenerator([
  "Ocelot",
  "Cobblestone",
  "Redstone",
  "Diamond",
  "Netherite",
  "Enderman",
  "Creeper",
  "Bedrock",
  "Obsidian",
  "Axolotl",
  "Glowstone",
  "Lapis Lazuli",
  "Emerald",
  "Amethyst",
  "Mooshroom",
  "Warden",
  "Elytra",
  "Beaconside",
]);

const AppGenerators = { profileNameGenerators };

export { AppGenerators };
