import { gql } from "graphql-request";
import { pokemonBase, PokemonBaseObject, PokemonEvolutionObject, pokemonEvolutions } from "./getPokemonBase";
import type z from "zod";

const PokemonBaseWithEvolutions = PokemonBaseObject.and(PokemonEvolutionObject);
type PokemonEvolutions = z.infer<typeof PokemonBaseWithEvolutions>;

export interface GetPokemonEvolutionsResponse {
  "pokemon": PokemonEvolutions
};

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