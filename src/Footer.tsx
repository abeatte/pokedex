import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>
                <span>&copy; {new Date().getFullYear()} Art Beatte IV. All rights reserved.</span>
                <span> | </span>
                <span>Data provided by GraphQL Pokémon API</span>
            </p>
        </footer>
    )
}

export default Footer;