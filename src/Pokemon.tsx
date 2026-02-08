import type { Pokemon } from "./graphql/getAllPokemon";

function pokemon(props: {pokemon: Pokemon}) {
    const {pokemon} = props;
    
    return (
        <div>{JSON.stringify(pokemon)}</div>
    )
}

export default pokemon;