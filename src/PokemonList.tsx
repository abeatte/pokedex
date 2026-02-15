import { getAllPokemon, getFuzzyPokemon, type Pokemon as PokemonType, type GetPokemonResponse, type GetSinglePokemonResponse } from "./graphql/getPokemon";
import Pokemon from "./Pokemon";
import './css/Pokemon.css'
import FetchNextPageSentinel from "./FetchNextPageSentinel";
import ErrorBoundary from "./ErrorBoundary";
import { Fragment } from "react";
import request from "graphql-request";
import { useHeaderInfo } from "./HeaderInfoContext";
import { keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const POKEMON_START_OFFSET = 93;
const PAGE_SIZE = 10;

interface PokemonResponse {
  "pokemon": [
    PokemonType
  ]
}

function PokemonList() {
  const { searchQuery } = useHeaderInfo();
  const queryClient = useQueryClient();

  const fetchAllPokemon = async ({ pageParam = 0 }: { pageParam: number }) => {
    const offset = POKEMON_START_OFFSET + (PAGE_SIZE * pageParam);
    const response = await request<GetPokemonResponse>('https://graphqlpokemon.favware.tech/v8', getAllPokemon, {
      "offset": offset,
      "take": PAGE_SIZE,
      "reverse": false,
      "offsetFlavorTexts": offset,
      "takeFlavorTexts": PAGE_SIZE,
      "reverseFlavorTexts": false
    });

    // store individual pokemon query values
    response.pokemon.map(pokemon => queryClient.setQueryData(['getPokemon', pokemon.species], { pokemon } satisfies GetSinglePokemonResponse))

    return response;
  };

  const fetchFuzzyPokemon = async ({ pageParam = 0 }: { pageParam: number }) => {
    const offset = PAGE_SIZE * pageParam;
    const response = await request<GetPokemonResponse>('https://graphqlpokemon.favware.tech/v8', getFuzzyPokemon, {
      "offset": offset,
      "take": PAGE_SIZE,
      "pokemon": searchQuery,
      "reverse": false,
      "offsetFlavorTexts": offset,
      "takeFlavorTexts": PAGE_SIZE,
      "reverseFlavorTexts": false
    })

    // store individual pokemon query values
    response.pokemon.map(pokemon => queryClient.setQueryData(['getPokemon', pokemon.species], { pokemon } satisfies GetSinglePokemonResponse))

    return response;
  };

  const getAllQueryResponse = useInfiniteQuery({
    queryKey: ['getAllPokemon'],
    queryFn: fetchAllPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.pokemon.length < PAGE_SIZE) {
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
      if (lastPage.pokemon.length < PAGE_SIZE) {
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

  const pokemen = queryResponse?.data?.pages.map((page: PokemonResponse, idx: number) => (
    <Fragment key={idx}>
      {page.pokemon?.map(pokemon => (
        <ErrorBoundary key={pokemon.key} >
          <Pokemon pokemon={pokemon} />
        </ErrorBoundary>
      ))}
    </Fragment>
  ));

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-grid">
        {pokemen}
        <FetchNextPageSentinel key={'fetchNextPageSentinel'} fetchParams={queryResponse} />
      </div>
    </div>
  )
}

export default PokemonList;