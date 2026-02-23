import { gql } from "graphql-request";
import { pokemon } from "./getPokemonBase";

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