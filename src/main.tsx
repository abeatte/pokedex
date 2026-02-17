import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import App from './App.tsx';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import SingleRoutedPokemon from './SingleRoutedPokemon.tsx';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const singlePokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon/$species',
  component: SingleRoutedPokemon,
});

const routeTree = rootRoute.addChildren([indexRoute, singlePokemonRoute])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const router = createRouter({
  routeTree,
  basepath: '/pokedex/'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools router={router} initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
