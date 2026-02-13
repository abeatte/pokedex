import { createContext, useContext, useState, type ReactNode } from 'react';

const HeaderInfoContext = createContext({
  searchQuery: '',
  hasSearchQuery: false,
  setSearchQuery: (_query: string) => {},
});

export const useHeaderInfo = () => {
  const context = useContext(HeaderInfoContext);
  if (context === undefined) {
    throw new Error('useHeaderInfo must be used within a HeaderInfoProvider');
  }

  return context;
};

export const HeaderInfoProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const hasSearchQuery = searchQuery?.length > 0;

  const publicSetSearchQuery = (query: string) => {
    setSearchQuery(query?.length > 0 ? query : '');
  };

  const value = { hasSearchQuery, searchQuery, setSearchQuery: publicSetSearchQuery };

  return (
    <HeaderInfoContext.Provider value={value}>
      {children}
    </HeaderInfoContext.Provider>
  );
};

export default HeaderInfoContext;