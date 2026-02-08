import { useQuery } from "@tanstack/react-query";
import { getAllPokemon, type GetAllPokemonResponse } from "./graphql/getAllPokemon";
import request from "graphql-request";
import Pokemon from "./Pokemon";

function PokemonList() {

  const { data } = useQuery<GetAllPokemonResponse>({
    queryKey: ['getAllPokemon'], queryFn: async () =>
      request('https://graphqlpokemon.favware.tech/v8', getAllPokemon, {
        "offset": 42,
        "take": 42,
        "reverse": true,
        "offsetFlavorTexts": 42,
        "takeFlavorTexts": 42,
        "reverseFlavorTexts": true
      })
  })

  const pokemen = data?.getAllPokemon?.map(pokemon => (<Pokemon pokemon={pokemon} />));

  return (
    <div>
      {pokemen}
    </div>
  )
}

export default PokemonList;