import SkillCard from '@/components/cards/CardComponent';
import Navbar from '@/components/Navbar';
import { skillCardsData } from '@/constants/skillCardData';

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        {skillCardsData.map((card, index) => (
          <SkillCard
            key={index}
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
}
