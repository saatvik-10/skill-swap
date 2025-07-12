import Image from 'next/image';
import React from 'react';

interface SkillCardProps {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  profilePhotoUrl?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  skillsOffered,
  skillsWanted,
  rating,
  profilePhotoUrl,
}) => {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {Array(fullStars).fill('★').map((star, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">{star}</span>
        ))}
        {Array(emptyStars).fill('☆').map((star, i) => (
          <span key={`empty-${i}`} className="text-yellow-400 text-sm">{star}</span>
        ))}
      </>
    );
  };

  return (
    <div className="w-full max-w-4xl bg-[#1c1c1c] text-white rounded-xl p-4 border border-white shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Profile Photo */}
        <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center overflow-hidden">
          {profilePhotoUrl ? (
            <Image
              src={profilePhotoUrl}
              alt="Profile"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-xs text-white text-center px-1">Profile Photo</span>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold">{name}</span>
            <div className="flex">{getStars(rating)}</div>
          </div>

          {/* Skills Offered */}
          <div>
            <span className="text-green-400 text-sm">Skills Offered</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 border border-white px-2 py-0.5 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <span className="text-blue-400 text-sm">Skill wanted</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 border border-white px-2 py-0.5 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request Button */}
      <div className="ml-4">
        <button className="bg-teal-700 hover:bg-teal-600 text-white text-sm px-3 py-1.5 rounded-lg">
          Request
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
