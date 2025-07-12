'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SkillCard from '@/components/cards/CardComponent';
import { skillCardsData } from '@/data/skillCardData';
import { useSkillSearch } from '@/hooks/useSkillSearch';

const Hero = () => {
  const {
    searchQuery,
    filteredResults,
    handleSearchQueryChange,
    clearSearch,
    hasResults,
    resultCount,
  } = useSkillSearch(skillCardsData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchQueryChange(e.target.value);
  };

  return (
    <div className='flex flex-col gap-y-6'>
      {/* Search Section */}
      <div className='flex items-center justify-end'>
        <div className='border flex items-center rounded-lg overflow-hidden w-96'>
          <Input
            className='border-none text-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder='Search skills, courses, or mentors...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          {/* <Button
            className='rounded-none text-white bg-blue-500 border hover:bg-blue-600 cursor-pointer'
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button> */}
          {searchQuery && (
            <Button
              variant='ghost'
              size='sm'
              onClick={clearSearch}
              className='px-2'
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className='text-center text-sm text-gray-600'>
          {hasResults ? (
            <p>
              Found {resultCount} result{resultCount !== 1 ? 's' : ''} for
              &quot;{searchQuery}&quot;
            </p>
          ) : (
            <p>No results found for &quot;{searchQuery}&quot;</p>
          )}
        </div>
      )}

      {/* Cards Section */}
      <div className='flex flex-col items-center justify-center gap-6'>
        {filteredResults.map((card, index) => (
          <SkillCard
            key={`${card.name}-${index}`}
            name={card.name}
            skillsOffered={card.skillsOffered}
            skillsWanted={card.skillsWanted}
            rating={card.rating}
            profilePhotoUrl={card.profilePhotoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
