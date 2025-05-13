
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import RatingStars from './RatingStars';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className="font-medium">{review.reviewerName || 'Anonymous User'}</p>
            <div className="flex items-center mt-1">
              <RatingStars rating={review.rating} />
              <span className="text-xs text-muted-foreground ml-2">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        
        {review.comment && (
          <div className="mt-3 text-sm">
            <p>{review.comment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
