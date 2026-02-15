import './css/Pokemon.css'
import { useParams } from '@tanstack/react-router';
import SinglePokemon from './SinglePokemon';
import Footer from './Footer';

function SingleRoutedPokemon() {
    const { species } = useParams({ from: '/pokemon/$species' })

    return (
        <>
            <div className="pokemon-list-container">
                <div className="pokemon-single-grid">
                    <SinglePokemon species={species} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SingleRoutedPokemon;
