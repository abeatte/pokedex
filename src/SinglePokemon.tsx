import './css/Pokemon.css'
import { getSinglePokemon, type GetSinglePokemonResponse } from "./graphql/getPokemon";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from './ErrorBoundary';
import Pokemon from './Pokemon';
import type { ReactNode } from 'react';
import { FaArrowTurnDown } from 'react-icons/fa6';

function SinglePokemon({ species, generation = 0 }: { species: string, generation?: number }) {

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
    const cards: ReactNode[] = [];

    if (pokemon) {
        cards.push(
            <ErrorBoundary key={pokemon.key}>
                <Pokemon pokemon={pokemon} generation={generation} />
            </ErrorBoundary>
        );

        pokemon.evolutions?.map(evolve => {
            cards.push(
                <div className='evolution-container'>
                    <FaArrowTurnDown className='evolve-arrow' style={{'paddingTop': (96 * generation + 40) + 'px'}}/>
                    <SinglePokemon species={evolve.species} generation={generation + 1} />
                </div>
            );
        });
    }

    return (
        <>
            {cards}
        </>
    );
}

export default SinglePokemon;
