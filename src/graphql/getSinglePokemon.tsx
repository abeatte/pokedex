import { gql } from "graphql-request";
import { Pokemon, pokemon } from "./getPokemonBase";

export interface GetSinglePokemonResponse {
  "pokemon": Pokemon
};

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