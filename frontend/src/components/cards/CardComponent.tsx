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
        {Array(fullStars)
          .fill('★')
          .map((star, i) => (
            <span key={`full-${i}`} className="text-yellow-400 text-sm">
              {star}
            </span>
          ))}
        {Array(emptyStars)
          .fill('☆')
          .map((star, i) => (
            <span key={`empty-${i}`} className="text-yellow-400 text-sm">
              {star}
            </span>
          ))}
      </>
    );
  };

  return (
    <div className="flex items-center justify-between bg-white text-blue-500 rounded-xl p-4 border border-blue-200 w-full max-w-3xl shadow-md">
      <div className="flex items-center space-x-4">
        {/* Profile Photo */}
        <div className="w-16 h-16 rounded-full border border-blue-300 flex items-center justify-center overflow-hidden">
          {profilePhotoUrl ? (
            <Image
              src={profilePhotoUrl}
              alt="Profile"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-xs text-blue-400 text-center px-1">
              Profile Photo
            </span>
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
            <span className="text-blue-600 text-sm font-medium">
              Skills Offered
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <span className="text-blue-600 text-sm font-medium">
              Skills Wanted
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs"
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
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg transition">
          Request
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
