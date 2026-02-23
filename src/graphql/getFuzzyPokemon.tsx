import { gql } from "graphql-request";
import { pokemon } from "./getPokemonBase";

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