import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getAllPokemon, type GetAllPokemonResponse } from "./graphql/getAllPokemon";
import request from "graphql-request";
import Pokemon from "./Pokemon";
import './css/Pokemon.css'
import FetchNextPageSentinel from "./FetchNextPageSentinel";

const PAGE_SIZE = 10;

function PokemonList() {
  const fetchAllPokemon = async ({ pageParam = 0 }: { pageParam: number }) => {
    const offset = PAGE_SIZE * pageParam;
    return request('https://graphqlpokemon.favware.tech/v8', getAllPokemon, {
      "offset": offset,
      "take": PAGE_SIZE,
      "reverse": true,
      "offsetFlavorTexts": offset,
      "takeFlavorTexts": PAGE_SIZE,
      "reverseFlavorTexts": true
    })
  };

  const queryResponse = useInfiniteQuery({
    queryKey: ['getAllPokemon'],
    queryFn: fetchAllPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
    placeholderData: keepPreviousData,
  })

  const pokemen = queryResponse?.data?.pages.map((page : GetAllPokemonResponse) => (
    <>
      {page.getAllPokemon?.map(pokemon => (<Pokemon key={pokemon.key} pokemon={pokemon} />))}
    </>
  ));

  return (
    <div className="pokemon-list-container">
      <div className="grid">
        {pokemen}
        <FetchNextPageSentinel fetchParams={queryResponse}/>
      </div>
    </div>
  )
}

export default PokemonList;