import z from "zod";

const CatchRateObject = z.object({
  base: z.number(), // 30,
  percentageWithOrdinaryPokeballAtFullHealth: z.string(), // "8.8%"
});

const TypeObject = z.object({
  name: z.string(), // "Rock"
});

export interface Evolution {
  key: string,
  species: string,
  evolutions?: Evolution[],
}

export const EvolutionObject = z.object({
  key: z.string(),
  species: z.string(),
  evolutions: z.lazy(() => EvolutionSchema.array()),
});

const EvolutionSchema: z.ZodType<Evolution> = EvolutionObject;

const FlavorTextObject = z.object({
  flavor: z.string(), // "Some of its notable features match those of an object named within a certain expedition journal as Iron Thorns.",
  game: z.string(), // "Violet"
});

export const PokemonBaseObject = z.object({
  key: z.string(),
  species: z.string(), // "Iron Thorns",
});

export const PokemonEvolutionObject = z.object({
  evolutions: z.array(EvolutionSchema).optional(),
  preevolutions: z.array(EvolutionSchema).optional(),
});

export const Pokemon = z.object({
  backSprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5-back/ironthorns.png",
  // baseForme: null,
  // baseSpecies: null,
  baseStats: {
    attack: z.number(), // 134,
    defense: z.number(), // 110,
    hp: z.number(), // 100,
    specialattack: z.number(), //  70,
    specialdefense: z.number(), // 84,
    speed: z.number(), // 72
  },
  baseStatsTotal: z.number(), // 570,
  bulbapediaPage: z.url(), // "https://bulbapedia.bulbagarden.net/wiki/Iron Thorns_(Pokémon)",
  catchRate: CatchRateObject,
  classification: z.string(), // "Paradox Pokémon",
  // respelling: null,
  // ipa: null,
  color: z.string(), // "Green",
  // cosmeticFormes: null,
  cry: z.url(), // "https://play.pokemonshowdown.com/audio/cries/ironthorns.mp3",
  eggGroups: z.array(
    z.string() // Undiscovered
  ),
  // evolutionLevel: null,
  evYields: {
    attack: z.number(), // 3,
    defense: z.number(), // 0,
    hp: z.number(), // 0,
    specialattack: z.number(), // 0,
    specialdefense: z.number(), // 0,
    speed: z.number(), // 0
  },
  flavorTexts: z.array(FlavorTextObject),
  // forme: null,
  // formeLetter: null,
  gender: {
    female: z.string(), // "0%",
    male: z.string(), // "0%"
  },
  height: z.number(), // 1.6,
  isEggObtainable: z.boolean(), // false,
  levellingRate: z.string(), // "Slow",
  maximumHatchTime: z.number(), // 13106,
  minimumHatchTime: z.number(), // 12850,
  num: z.number(), // 995,
  // otherFormes: null,
  serebiiPage: z.url(), // "https://www.serebii.net/pokedex-sv/ironthorns",
  shinyBackSprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5-back-shiny/ironthorns.png",
  shinySprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5-shiny/ironthorns.png",
  smogonPage: z.url(), // "https://www.smogon.com/dex/sv/pokemon/iron-thorns",
  smogonTier: z.string(), // "NUBL",
  sprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5/ironthorns.png",
  types: z.array(TypeObject),
  weight: z.number(), // 303,
  mythical: z.boolean(), // false,
  legendary: z.boolean(), // false
}).and(PokemonBaseObject).and(PokemonEvolutionObject);

export type Pokemon = z.infer<typeof Pokemon>;

export interface GetPokemonResponse {
  "pokemon": [
    Pokemon
  ]
};

export const pokemonBase = `
    key
    species
`;

export const pokemonEvolutions = `
  evolutions {
    key
    species
    evolutions {
      key
      species
      evolutions {
        key
        species
        evolutions {
          key
          species
        }
      }
    }
  }
  preevolutions {
    key
    species
    preevolutions {
      key
      species
      preevolutions {
        key
        species
        preevolutions {
          key
          species
        }
      }
    }
  }
`;

export const pokemon = `
  ${pokemonBase}
  ${pokemonEvolutions}
  backSprite
  baseForme
  baseSpecies
  baseStats {
    attack
    defense
    hp
    specialattack
    specialdefense
    speed
  }
  baseStatsTotal
  bulbapediaPage
  catchRate {
    base
    percentageWithOrdinaryPokeballAtFullHealth
  }
  classification
  respelling
  ipa
  color
  cosmeticFormes
  cry
  eggGroups
  evolutionLevel
  evYields {
    attack
    defense
    hp
    specialattack
    specialdefense
    speed
  }
  flavorTexts {
    flavor
    game
  }
  forme
  formeLetter
  gender {
    female
    male
  }
  height
  isEggObtainable
  levellingRate
  maximumHatchTime
  minimumHatchTime
  num
  otherFormes
  serebiiPage
  shinyBackSprite
  shinySprite
  smogonPage
  smogonTier
  sprite
  types {
    name
  }
  weight
  mythical
  legendary
`;