import { FaPlay } from "react-icons/fa";
import type { Pokemon } from "./graphql/getPokemon";
import './css/Pokemon.css'
import { useState, useEffect, useRef, type MouseEventHandler } from "react";

function pokemon({ pokemon, index = 0, zIndex = 0, onCardClick }: { pokemon: Pokemon, index?: number, zIndex?: number, onCardClick: (pokemon: Pokemon) => void }) {
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

    const [displayIndex, setDisplayIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [hasFlipped, setHasFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isImageAnimating, setIsImageAnimating] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const hasBothSprites = sprite && backSprite;
    const hasShinySprites = shinySprite && shinyBackSprite;

    // Trigger flip animation when card enters viewport
    useEffect(() => {
        if (!cardRef.current || hasFlipped) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasFlipped) {
                    setIsAnimating(true);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(cardRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasFlipped]);

    // Determine which sprite to show based on index
    // 0: front, 1: back, 2: shiny front, 3: shiny back
    const getSpriteSrcByIndex = (index: number) => {
        if (!hasShinySprites) {
            // If no shiny sprites, just alternate between front and back
            return index % 2 === 0 ? sprite : backSprite;
        }

        // Full cycle: front -> back -> shiny front -> shiny back
        switch (index % 4) {
            case 0: return sprite;
            case 1: return backSprite;
            case 2: return shinySprite;
            case 3: return shinyBackSprite;
            default: return sprite;
        }
    };

    const handleSpriteClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        if (!hasBothSprites) return;

        setIsImageAnimating(true);
    };

    const playCry: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        new Audio(cry)
            .play()
            .catch(error => console.error(`Audio playback failed for ${species}'s cry:`, error));
    };

    const playCryButton = cry && (
        <button className="play_button" onClick={playCry}>
            <FaPlay />
        </button>
    );

    const handleError = () => {
        setImageError(true);
    }

    const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation()
        onCardClick(pokemon);
    }

    if (imageError) {
        // This works with ErrorBoundary to catch and remove this Card when images fail to load
        throw new Error(`Unable to load Pokemon image for ${species}`);
    }

    const spriteCount = hasShinySprites ? 4 : 2;

    return (
        <div
            ref={cardRef}
            style={{ 'padding': `${96 * index}px 0 0 ${index > 0 ? 144 : 0}px` , 'zIndex': zIndex}}
            className={`card_container ${hasFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}
            onTransitionEnd={() => {
                setIsAnimating(false);
                setHasFlipped(true);
            }}
        >
            <div className="card_flipper">
                <div className="card back"></div>
                <div className="card front" onClick={handleCardClick}>
                    <div className="name">{species}</div>
                    <div className="image_window" onClick={handleSpriteClick} >
                        <span
                            className={`pokemon_image_container ${isImageAnimating ? 'animating' : ''}`}>
                            <div className="image_flipper" >
                                {
                                    [...Array(spriteCount).keys()].map((idx) => {
                                        const nextDisplayIndex = (displayIndex + 1) % spriteCount;
                                        return (
                                            <img
                                                key={`sprite-${idx}`}
                                                className={`image ${displayIndex == idx ? 'front' : nextDisplayIndex == idx ? 'back' : 'gone'}`}
                                                src={getSpriteSrcByIndex(idx)}
                                                onError={handleError}
                                                onTransitionEnd={_ => {
                                                    if (displayIndex == idx && isImageAnimating) {
                                                        setIsImageAnimating(false);
                                                        setDisplayIndex(nextDisplayIndex);
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                            </div>
                        </span>
                        {playCryButton}
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
            </div>
        </div>
    );
}

export default pokemon;