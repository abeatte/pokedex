import './css/Pokemon.css'
import { useParams } from '@tanstack/react-router';
import PokemonEvolutionStack from './PokemonEvolutionStack';
import Footer from './Footer';
import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { getPokemonEvolutions, type GetPokemonEvolutionsResponse } from './graphql/getPokemonEvolutions';
import type { Evolution } from './graphql/getPokemonBase';

function SingleRoutedPokemon() {
    const { species } = useParams({ from: '/pokemon/$species' })

    const fetchPokemonEvolutions = async () => {
        return await request<GetPokemonEvolutionsResponse>('https://graphqlpokemon.favware.tech/v8', getPokemonEvolutions, {
            'pokemon': species
        });
    };

    const fetchPokemonEvolutionsResponse = useQuery({
        queryKey: ['getPokemonEvolutions', species],
        queryFn: fetchPokemonEvolutions,
    })

    let stack: Evolution[] = [];
    let preevolutionsCount = 0;
    let ev = fetchPokemonEvolutionsResponse?.data?.pokemon;
    while (ev != undefined) {
        stack.push(ev);
        if ((ev.evolutions?.length ?? 0) > 1) {
            console.warn('Pokemon has more than a single Evolution!!!')
        }
        ev = ev.evolutions?.[0];
    }

    ev = fetchPokemonEvolutionsResponse?.data?.pokemon;
    while (ev != undefined) {
        if ((ev.preevolutions?.length ?? 0) > 1) {
            console.warn('Pokemon has more than a single Pre-eolution!!!')
        }
        const preev = ev.preevolutions?.[0];
        if (preev && !stack.includes(preev)) {
            stack = [preev, ... stack];
            preevolutionsCount++;
        }
        ev = preev;
    }

    const zIndexes = stack.map((_, idx, arr) => {
        if (idx < preevolutionsCount) {
            return idx;
        }

        return arr.length - 1 - idx + preevolutionsCount;
    });
    
    return (
        <>
            <div className="pokemon-list-container">
                {!fetchPokemonEvolutionsResponse.isLoading && <PokemonEvolutionStack stack={stack} zIndexes={zIndexes} />}
            </div>
            <Footer />
        </>
    )
}

export default SingleRoutedPokemon;
