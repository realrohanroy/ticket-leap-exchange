
import React from 'react';
import { Badge } from '@/components/ui/badge';
import RatingStars from './RatingStars';

interface UserRatingBadgeProps {
  rating: number | null;
  reviewCount: number;
  size?: 'sm' | 'md';
}

const UserRatingBadge: React.FC<UserRatingBadgeProps> = ({ 
  rating, 
  reviewCount,
  size = 'md'
}) => {
  if (!rating || reviewCount === 0) return null;
  
  const badgeSize = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  
  return (
    <Badge variant="outline" className={`${badgeSize} flex items-center gap-1 bg-yellow-50 border-yellow-200`}>
      <RatingStars rating={rating} size={size === 'sm' ? 'sm' : 'md'} />
      <span className="text-gray-600 ml-1">({reviewCount})</span>
    </Badge>
  );
};

export default UserRatingBadge;
