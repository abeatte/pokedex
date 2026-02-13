import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './css/Header.css';
import graphqlPokemonLogo from '/graphql-pokemon.png'

function Header() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <header className={`header ${isExpanded ? 'expanded' : ''}`}>
            <div className="header-main">
                <span className="title">
                    <a href="https://github.com/favware/graphql-pokemon" target="_blank">
                        <img src={graphqlPokemonLogo} className="logo spin graphqlpokemon" alt="GraphQL-Pokemon logo" />
                    </a>
                    <h1>Pokédex</h1>
                </span>
                <button
                    className="expand-button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? "Collapse controls" : "Expand controls"}
                >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {isExpanded && (
                <div className="header-controls">
                    <div className="control-group">
                        <label htmlFor="search">Search:</label>
                        <input type="text" id="search" placeholder="Search Pokémon..." />
                    </div>
                    <div className="control-group">
                        <label htmlFor="sort">Sort by:</label>
                        <select id="sort">
                            <option value="number">Number</option>
                            <option value="name">Name</option>
                            <option value="type">Type</option>
                        </select>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;