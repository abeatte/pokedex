import { getAllPokemon, getFuzzyPokemon, type GetAllPokemonResponse, type GetFuzzyPokemonResponse } from "./graphql/getAllPokemon";
import Pokemon from "./Pokemon";
import './css/Pokemon.css'
import FetchNextPageSentinel from "./FetchNextPageSentinel";
import ErrorBoundary from "./ErrorBoundary";
import { Fragment } from "react";
import request from "graphql-request";
import { useHeaderInfo } from "./HeaderInfoContext";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;

function PokemonList() {
  const { searchQuery } = useHeaderInfo();

  const fetchAllPokemon = async ({ pageParam = 0 }: { pageParam: number }) => {
    const offset = PAGE_SIZE * pageParam;
    return request('https://graphqlpokemon.favware.tech/v8', getAllPokemon, {
      "offset": offset,
      "take": PAGE_SIZE,
      "reverse": false,
      "offsetFlavorTexts": offset,
      "takeFlavorTexts": PAGE_SIZE,
      "reverseFlavorTexts": false
    })
  };

  const fetchFuzzyPokemon = async ({ pageParam = 0 }: { pageParam: number }) => {
    const offset = PAGE_SIZE * pageParam;
    return request('https://graphqlpokemon.favware.tech/v8', getFuzzyPokemon, {
      "offset": offset,
      "take": PAGE_SIZE,
      "pokemon": searchQuery,
      "reverse": false,
      "offsetFlavorTexts": offset,
      "takeFlavorTexts": PAGE_SIZE,
      "reverseFlavorTexts": false
    })
  };

  const getAllQueryResponse = useInfiniteQuery({
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
    enabled: searchQuery.length === 0,
    placeholderData: keepPreviousData,
  })

  const searchQueryResponse = useInfiniteQuery({
    queryKey: ['getFuzzyPokemon', searchQuery],
    queryFn: fetchFuzzyPokemon,
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
    enabled: searchQuery.length > 0,
    placeholderData: keepPreviousData,
  })

  const queryResponse = searchQuery.length === 0 ? getAllQueryResponse : searchQueryResponse;

  const pokemen = queryResponse?.data?.pages.map((page: GetAllPokemonResponse & GetFuzzyPokemonResponse, idx: number) => (
    <Fragment key={idx}>
      {(page.getAllPokemon ?? page.getFuzzyPokemon)?.map(pokemon => (
        <ErrorBoundary key={pokemon.key} >
          <Pokemon pokemon={pokemon} />
        </ErrorBoundary>
      ))}
    </Fragment>
  ));

  return (
    <div className="pokemon-list-container">
      <div className="grid">
        {pokemen}
        <FetchNextPageSentinel key={'fetchNextPageSentinel'} fetchParams={queryResponse} />
      </div>
    </div>
  )
}

export default PokemonList;