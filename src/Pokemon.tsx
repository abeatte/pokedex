import { FaPlay } from "react-icons/fa";
import type { Pokemon } from "./graphql/getPokemon";
import './css/Pokemon.css'
import { useState } from "react";

function pokemon(props: { pokemon: Pokemon }) {
    const { pokemon } = props;
    const {
        species,
        sprite, backSprite,
        shinySprite, shinyBackSprite,
        cry,
        catchRate,
        height, weight,
        num,
        types,
        mythical, legendary,
        minimumHatchTime, maximumHatchTime,
    } = pokemon;

    const [flipKey, setFlipKey] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    const hasBothSprites = sprite && backSprite;
    const hasShinySprites = shinySprite && shinyBackSprite;

    // Determine which sprite to show based on index
    // 0: front, 1: back, 2: shiny front, 3: shiny back
    const getCurrentSprite = () => {
        if (!hasShinySprites) {
            // If no shiny sprites, just alternate between front and back
            return displayIndex % 2 === 0 ? sprite : backSprite;
        }

        // Full cycle: front -> back -> shiny front -> shiny back
        switch (displayIndex % 4) {
            case 0: return sprite;
            case 1: return backSprite;
            case 2: return shinySprite;
            case 3: return shinyBackSprite;
            default: return sprite;
        }
    };

    const handleSpriteClick = () => {
        if (!hasBothSprites) return;

        // Trigger animation by changing key
        setFlipKey(prev => prev + 1);

        // Change sprite at midpoint of animation (500ms into 1s animation)
        setTimeout(() => {
            setDisplayIndex(prev => prev + 1);
        }, 500);
    };

    const playCry = () => {
        new Audio(cry)
            .play()
            .catch(error => console.error(`Audio playback failed for ${species}'s cry:`, error));
    };

    const handleError = () => {
        setImageError(true);
    }

    if (imageError) {
        // This works with ErrorBoundary to catch and remove this Card when images fail to load
        throw new Error(`Unable to load Pokemon image for ${species}`);
    }

    return (
        <div className="card">
            <div className="name">{species}</div>
            <div className="image_window">
                <span className="pokemon_image_container" onClick={handleSpriteClick} >
                    <img key={flipKey} className="flipping" src={getCurrentSprite()} onError={handleError} />
                </span>
                <button className="play_button" onClick={playCry}>
                    <FaPlay />
                </button>
            </div>
            <div className="stats">
                <div>Height: {height}m</div>
                <div>Weight: {weight}kg</div>
                <div>Number: {num}</div>
                <div>Types: {Array.from(types.map(type => type.name)).join(', ')}</div>
                {mythical || legendary && (<div>
                    {mythical && (<span>Mythical: {mythical}</span>)}
                    {legendary && (<span>Legendary: {legendary}</span>)}
                </div>)}
                <div>Catch Rate: {catchRate.base} | {catchRate.percentageWithOrdinaryPokeballAtFullHealth}</div>
                <div>Hatch Time: {minimumHatchTime} steps - {maximumHatchTime} steps</div>
            </div>
        </div>
    );
}

export default pokemon;