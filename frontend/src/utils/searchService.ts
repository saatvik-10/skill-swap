import Fuse, { IFuseOptions } from 'fuse.js';

export interface SkillCard {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  profilePhotoUrl?: string;
}

interface SearchKey {
  name: string;
  weight: number;
}

export class SkillSearchService {
  private fuse: Fuse<SkillCard>;
  private originalData: SkillCard[];

  constructor(data: SkillCard[]) {
    this.originalData = data;

    const options: IFuseOptions<SkillCard> = {
      includeScore: true,
      threshold: 0.4, // Lower = more strict matching
      ignoreLocation: true,
      useExtendedSearch: true,
      keys: [
        {
          name: 'name',
          weight: 0.6, // Highest priority - 60%
        },
        {
          name: 'skillsOffered',
          weight: 0.25, // Second priority - 25%
        },
        {
          name: 'skillsWanted',
          weight: 0.15, // Lowest priority - 15%
        },
      ],
    };

    this.fuse = new Fuse(data, options);
  }

  search(query: string): SkillCard[] {
    if (!query.trim()) {
      return this.originalData;
    }

    const results = this.fuse.search(query);

    return results
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map((result) => result.item);
  }

  searchAdvanced(
    query: string,
    searchFields?: ('name' | 'skillsOffered' | 'skillsWanted')[]
  ): SkillCard[] {
    if (!query.trim()) {
      return this.originalData;
    }

    if (searchFields && searchFields.length > 0) {
      const filteredKeys = this.getKeysForFields(searchFields);
      const tempFuse = new Fuse(this.originalData, {
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
        useExtendedSearch: true,
        keys: filteredKeys,
      });

      const results = tempFuse.search(query);
      return results
        .sort((a, b) => (a.score || 0) - (b.score || 0))
        .map((result) => result.item);
    }

    return this.search(query);
  }

  private getKeysForFields(
    fields: ('name' | 'skillsOffered' | 'skillsWanted')[]
  ): SearchKey[] {
    const keyMap: Record<string, SearchKey> = {
      name: { name: 'name', weight: 0.6 },
      skillsOffered: { name: 'skillsOffered', weight: 0.25 },
      skillsWanted: { name: 'skillsWanted', weight: 0.15 },
    };

    return fields.map((field) => keyMap[field]);
  }

  getSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const results = this.fuse.search(query);
    const suggestions = new Set<string>();

    results.slice(0, limit * 2).forEach((result) => {
      const item = result.item;

      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(item.name);
      }

      [...item.skillsOffered, ...item.skillsWanted].forEach((skill) => {
        if (
          skill.toLowerCase().includes(query.toLowerCase()) &&
          suggestions.size < limit
        ) {
          suggestions.add(skill);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }
}
