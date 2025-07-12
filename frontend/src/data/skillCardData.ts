// src/constants/skillCardsData.ts

export interface SkillCardData {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  profilePhotoUrl?: string;
}

export const skillCardsData: SkillCardData[] = [
  {
    name: 'Michell',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 2.5,
  },
  {
    name: 'Alex',
    skillsOffered: ['React', 'TypeScript'],
    skillsWanted: ['UI/UX Design', 'Figma'],
    rating: 4,
  },
  {
    name: 'Sara',
    skillsOffered: ['Node.js', 'Express'],
    skillsWanted: ['Branding', 'Illustration'],
    rating: 3.5,
  },
];
