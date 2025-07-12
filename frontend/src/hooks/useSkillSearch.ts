import { useState, useEffect, useMemo } from 'react';
import { SkillSearchService, SkillCard } from '@/utils/searchService';

export const useSkillSearch = (data: SkillCard[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SkillCard[]>(data);
  const [isSearching, setIsSearching] = useState(false);

  const searchService = useMemo(() => new SkillSearchService(data), [data]);

  useEffect(() => {
    const performSearch = () => {
      setIsSearching(true);

      if (searchQuery.trim()) {
        const results = searchService.search(searchQuery);
        setFilteredResults(results);
      } else {
        setFilteredResults(data);
      }

      setIsSearching(false);
    };

    const timeoutId = setTimeout(performSearch, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchService, data]);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleAdvancedSearch = (
    query: string,
    fields?: ('name' | 'skillsOffered' | 'skillsWanted')[]
  ) => {
    setIsSearching(true);
    const results = searchService.searchAdvanced(query, fields);
    setFilteredResults(results);
    setSearchQuery(query);
    setIsSearching(false);
  };

  const getSuggestions = (query: string) => {
    return searchService.getSuggestions(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredResults(data);
  };

  return {
    searchQuery,
    filteredResults,
    isSearching,
    handleSearchQueryChange,
    handleAdvancedSearch,
    getSuggestions,
    clearSearch,
    hasResults: filteredResults.length > 0,
    resultCount: filteredResults.length,
  };
};
