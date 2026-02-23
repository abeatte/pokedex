import './css/Pokemon.css'
import { useState, type ReactNode } from 'react';
import SinglePokemon from './SinglePokemon';
import type { Evolution } from './graphql/getPokemonBase';

function PokemonEvolutionStack({ stack, zIndexes: initialZIndexes }: { stack: Array<Evolution>, zIndexes: number[] }) {
    const [zIndexes, setZIndexes] = useState(initialZIndexes);

    const handleOnCardClick = (index: number) => {
        setZIndexes(prev => {
            if (prev[index] === 0) {
                return prev;
            }

            const newZIndex = prev[index] - 1;
            const ret = prev.map((z, idx) => {
                if (z === newZIndex) {
                    return z + 1;
                } else if (idx === index) {
                    return newZIndex;
                }
                return z;
            });
            return ret;
        })
    };

    const cards: ReactNode[] = stack
        .map((evolution, index) => (
            <SinglePokemon
                key={evolution.key}
                species={evolution.species}
                index={index}
                zIndex={zIndexes[index]}
                onCardClick={() => handleOnCardClick(index)}
            />
        ));

    return (
        <div className="pokemon-single-grid">
            {cards}
        </div>
    );
}

export default PokemonEvolutionStack;
