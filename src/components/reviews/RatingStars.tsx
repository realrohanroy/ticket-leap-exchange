
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number | null;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'md', 
  showText = false,
  className = '' 
}) => {
  if (rating === null) return null;
  
  const starSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Create an array of 5 stars
  const stars = Array(5).fill(0).map((_, i) => {
    // Full star
    if (i < Math.floor(rating)) {
      return <Star key={i} className={`${starSize[size]} fill-yellow-400 text-yellow-400`} />;
    }
    // Half star
    else if (i < Math.ceil(rating) && rating % 1 !== 0) {
      return <StarHalf key={i} className={`${starSize[size]} fill-yellow-400 text-yellow-400`} />;
    }
    // Empty star
    else {
      return <Star key={i} className={`${starSize[size]} text-gray-300`} />;
    }
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">{stars}</div>
      {showText && (
        <span className={`${textSize[size]} text-muted-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
