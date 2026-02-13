import './css/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PokemonList from './PokemonList';
import Header from './Header';
import Footer from './Footer';
import { HeaderInfoProvider } from './HeaderInfoContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderInfoProvider>
        <Header />
        <PokemonList />
      </HeaderInfoProvider>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
