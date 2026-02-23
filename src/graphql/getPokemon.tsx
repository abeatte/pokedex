import { gql } from "graphql-request";
import z from "zod";

const CatchRate = z.object({
  base: z.number(), // 30,
  percentageWithOrdinaryPokeballAtFullHealth: z.string(), // "8.8%"
});

const Type = z.object({
  name: z.string(), // "Rock"
});

export interface Evolution {
  key: string,
  species: string,
  evolutions?: Evolution[],
}

export const Evolution = z.object({
  key: z.string(),
  species: z.string(),
  evolutions: z.lazy(() => EvolutionSchema.array()),
});

const EvolutionSchema: z.ZodType<Evolution> = Evolution;

const FlavorText = z.object({
  flavor: z.string(), // "Some of its notable features match those of an object named within a certain expedition journal as Iron Thorns.",
  game: z.string(), // "Violet"
});

const PokemonBase = z.object({
  key: z.string(),
  species: z.string(), // "Iron Thorns",
});

const PokemonEvolution = z.object({
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
  catchRate: CatchRate,
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
  flavorTexts: z.array(FlavorText),
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
  types: z.array(Type),
  weight: z.number(), // 303,
  mythical: z.boolean(), // false,
  legendary: z.boolean(), // false
}).and(PokemonBase).and(PokemonEvolution);

export type Pokemon = z.infer<typeof Pokemon>;

const PokemonBaseWithEvolutions = PokemonBase.and(PokemonEvolution);
type PokemonEvolutions = z.infer<typeof PokemonBaseWithEvolutions>;

export interface GetPokemonResponse {
  "pokemon": [
    Pokemon
  ]
};

export interface GetSinglePokemonResponse {
  "pokemon": Pokemon
};

export interface GetPokemonEvolutionsResponse {
  "pokemon": PokemonEvolutions
};

const pokemonBase = `
    key
    species
`;

const pokemonEvolutions = `
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

const pokemon = `
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

export const getAllPokemon = gql`
query (
  $offset: Int
  $take: Int
  $reverse: Boolean
  $offsetFlavorTexts: Int
  $takeFlavorTexts: Int
  $reverseFlavorTexts: Boolean
) {
  pokemon: getAllPokemon(
    offset: $offset
    take: $take
    reverse: $reverse
    offsetFlavorTexts: $offsetFlavorTexts
    takeFlavorTexts: $takeFlavorTexts
    reverseFlavorTexts: $reverseFlavorTexts
  ) {
    ${pokemon}
  }
}`

export const getFuzzyPokemon = gql`
query (
  $offset: Int
  $take: Int
  $reverse: Boolean
  $pokemon: String!
  $offsetFlavorTexts: Int
  $takeFlavorTexts: Int
  $reverseFlavorTexts: Boolean
) {
  pokemon: getFuzzyPokemon(
    offset: $offset
    take: $take
    pokemon: $pokemon
    reverse: $reverse
    offsetFlavorTexts: $offsetFlavorTexts
    takeFlavorTexts: $takeFlavorTexts
    reverseFlavorTexts: $reverseFlavorTexts
  ) {
    ${pokemon}
  }
}`

export const getSinglePokemon = gql`
query GetPokemon(
  $pokemon: PokemonEnum!
) {
  pokemon: getPokemon(
    pokemon: $pokemon
  ) {
    ${pokemon}
  }
}`

export const getPokemonEvolutions = gql`
query GetPokemon(
  $pokemon: PokemonEnum!
) {
  pokemon: getPokemon(
    pokemon: $pokemon
  ) {
    ${pokemonBase}
    ${pokemonEvolutions}
  }
}`