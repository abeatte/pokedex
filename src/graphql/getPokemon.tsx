import { gql } from "graphql-request";
import z from "zod";

const CatchRate = z.object({
  base: z.number(), // 30,
  percentageWithOrdinaryPokeballAtFullHealth: z.string(), // "8.8%"
});

const Type = z.object({
  name: z.string(), // "Rock"
});

export const Pokemon = z.object({
  key: z.string(),
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
  eggGroups: [
    z.string() // Undiscovered
  ],
  // evolutionLevel: null,
  // evolutions: null,
  evYields: {
    attack: z.number(), // 3,
    defense: z.number(), // 0,
    hp: z.number(), // 0,
    specialattack: z.number(), // 0,
    specialdefense: z.number(), // 0,
    speed: z.number(), // 0
  },
  flavorTexts: [
    {
      flavor: z.string(), // "Some of its notable features match those of an object named within a certain expedition journal as Iron Thorns.",
      game: z.string(), // "Violet"
    }
  ],
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
  // preevolutions: null,
  serebiiPage: z.url(), // "https://www.serebii.net/pokedex-sv/ironthorns",
  shinyBackSprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5-back-shiny/ironthorns.png",
  shinySprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5-shiny/ironthorns.png",
  smogonPage: z.url(), // "https://www.smogon.com/dex/sv/pokemon/iron-thorns",
  smogonTier: z.string(), // "NUBL",
  species: z.string(), // "Iron Thorns",
  sprite: z.url(), // "https://play.pokemonshowdown.com/sprites/gen5/ironthorns.png",
  types: z.array(Type),
  weight: z.number(), // 303,
  mythical: z.boolean(), // false,
  legendary: z.boolean(), // false
});

export type Pokemon = z.infer<typeof Pokemon>;

export interface GetAllPokemonResponse {
  "getAllPokemon": [
    Pokemon
  ]
}

export interface GetFuzzyPokemonResponse {
  "getFuzzyPokemon": [
    Pokemon
  ]
}

const pokemon = `{
    key
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
    evolutions {
      key
      backSprite
      baseForme
      baseSpecies
      baseStatsTotal
      bulbapediaPage
      classification
      respelling
      ipa
      color
      cosmeticFormes
      cry
      eggGroups
      evolutionLevel
      forme
      formeLetter
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
      species
      sprite
      weight
      mythical
      legendary
    }
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
    preevolutions {
      key
      backSprite
      baseForme
      baseSpecies
      baseStatsTotal
      bulbapediaPage
      classification
      respelling
      ipa
      color
      cosmeticFormes
      cry
      eggGroups
      evolutionLevel
      forme
      formeLetter
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
      species
      sprite
      weight
      mythical
      legendary
    }
    serebiiPage
    shinyBackSprite
    shinySprite
    smogonPage
    smogonTier
    species
    sprite
    types {
      name
    }
    weight
    mythical
    legendary
  }
}`;

export const getAllPokemon = gql`
query (
  $offset: Int
  $take: Int
  $reverse: Boolean
  $offsetFlavorTexts: Int
  $takeFlavorTexts: Int
  $reverseFlavorTexts: Boolean
) {
  getAllPokemon(
    offset: $offset
    take: $take
    reverse: $reverse
    offsetFlavorTexts: $offsetFlavorTexts
    takeFlavorTexts: $takeFlavorTexts
    reverseFlavorTexts: $reverseFlavorTexts
  ) ${pokemon}
`

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
  getFuzzyPokemon(
    offset: $offset
    take: $take
    pokemon: $pokemon
    reverse: $reverse
    offsetFlavorTexts: $offsetFlavorTexts
    takeFlavorTexts: $takeFlavorTexts
    reverseFlavorTexts: $reverseFlavorTexts
  ) ${pokemon}
`