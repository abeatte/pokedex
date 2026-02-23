import './css/Pokemon.css'
import { Pokemon as PokemonType } from "./graphql/getPokemonBase";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from './ErrorBoundary';
import Pokemon from './Pokemon';
import { getSinglePokemon, type GetSinglePokemonResponse } from './graphql/getSinglePokemon';

function SinglePokemon({ species, index, zIndex, onCardClick }: { species: string, index: number, zIndex: number, onCardClick: (pokemon: PokemonType) => void }) {

    const fetchPokemon = async () => {
        return await request<GetSinglePokemonResponse>('https://graphqlpokemon.favware.tech/v8', getSinglePokemon, {
            'pokemon': species
        });
    };

    const fetchPokemonResponse = useQuery({
        queryKey: ['getPokemon', species],
        queryFn: fetchPokemon,
    })

    const pokemon = fetchPokemonResponse?.data?.pokemon

    if (!pokemon) {
        return undefined;
    }

    return (
        <ErrorBoundary key={pokemon.key}>
            <Pokemon pokemon={pokemon} index={index} zIndex={zIndex} onCardClick={onCardClick} />
        </ErrorBoundary>
    );

};

export default SinglePokemon;
