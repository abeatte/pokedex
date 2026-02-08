import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { request, gql } from 'graphql-request';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

const getAllPokemon = gql`
query (
  $offset: Int
  $take: Int
  $reverse: Boolean
  $offsetFlavorTexts: Int
  $takeFlavorTexts: Int
  $reverseFlavorTexts: Boolean
) {
  getAllPokemon(
    offset: $offset
    take: $take
    reverse: $reverse
    offsetFlavorTexts: $offsetFlavorTexts
    takeFlavorTexts: $takeFlavorTexts
    reverseFlavorTexts: $reverseFlavorTexts
  ) {
    key
    backSprite
    baseForme
    baseSpecies
    baseStats {
      attack
      defense
      hp
      specialattack
      specialdefense
      speed
    }
    baseStatsTotal
    bulbapediaPage
    catchRate {
      base
      percentageWithOrdinaryPokeballAtFullHealth
    }
    classification
    respelling
    ipa
    color
    cosmeticFormes
    cry
    eggGroups
    evolutionLevel
    evolutions {
      key
      backSprite
      baseForme
      baseSpecies
      baseStatsTotal
      bulbapediaPage
      classification
      respelling
      ipa
      color
      cosmeticFormes
      cry
      eggGroups
      evolutionLevel
      forme
      formeLetter
      height
      isEggObtainable
      levellingRate
      maximumHatchTime
      minimumHatchTime
      num
      otherFormes
      serebiiPage
      shinyBackSprite
      shinySprite
      smogonPage
      smogonTier
      species
      sprite
      weight
      mythical
      legendary
    }
    evYields {
      attack
      defense
      hp
      specialattack
      specialdefense
      speed
    }
    flavorTexts {
      flavor
      game
    }
    forme
    formeLetter
    gender {
      female
      male
    }
    height
    isEggObtainable
    levellingRate
    maximumHatchTime
    minimumHatchTime
    num
    otherFormes
    preevolutions {
      key
      backSprite
      baseForme
      baseSpecies
      baseStatsTotal
      bulbapediaPage
      classification
      respelling
      ipa
      color
      cosmeticFormes
      cry
      eggGroups
      evolutionLevel
      forme
      formeLetter
      height
      isEggObtainable
      levellingRate
      maximumHatchTime
      minimumHatchTime
      num
      otherFormes
      serebiiPage
      shinyBackSprite
      shinySprite
      smogonPage
      smogonTier
      species
      sprite
      weight
      mythical
      legendary
    }
    serebiiPage
    shinyBackSprite
    shinySprite
    smogonPage
    smogonTier
    species
    sprite
    types {
      name
    }
    weight
    mythical
    legendary
  }
}
`

function Content() {
  const [count, setCount] = useState(0)

  const { data } = useQuery({
    queryKey: ['getAllPokemon'], queryFn: async () =>
      request('https://graphqlpokemon.favware.tech/v8', getAllPokemon, {
        "offset": 42,
        "take": 42,
        "reverse": true,
        "offsetFlavorTexts": 42,
        "takeFlavorTexts": 42,
        "reverseFlavorTexts": true
      })
  })

  console.log(data);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
