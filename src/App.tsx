import './css/App.css'
import PokemonList from './PokemonList';
import Header from './Header';
import Footer from './Footer';
import { HeaderInfoProvider } from './HeaderInfoContext';

function App() {
  return (
    <>
      <HeaderInfoProvider>
        <Header />
        <PokemonList />
      </HeaderInfoProvider>
      <Footer />
    </>
  )
}

export default App
