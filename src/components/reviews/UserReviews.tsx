
import React, { useEffect, useState } from 'react';
import { Review, User } from '@/types';
import ReviewCard from './ReviewCard';
import { supabase } from '@/integrations/supabase/client';
import UserRatingBadge from './UserRatingBadge';

interface UserReviewsProps {
  userId: string;
  className?: string;
}

const UserReviews: React.FC<UserReviewsProps> = ({ userId, className = '' }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        // Fetch the user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;
        
        if (profileData) {
          setUserProfile({
            id: profileData.id,
            name: profileData.name || 'User',
            email: '', // We don't expose email
            avgRating: profileData.avg_rating,
            reviewCount: profileData.review_count || 0
          });
        }

        // Fetch reviews for this user
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            *,
            reviewer:reviewer_id(id, name)
          `)
          .eq('reviewed_user_id', userId)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;
        
        if (reviewsData) {
          const formattedReviews: Review[] = reviewsData.map((review: any) => ({
            id: review.id,
            reviewerId: review.reviewer_id,
            reviewerName: review.reviewer?.name || 'Anonymous User',
            reviewedUserId: review.reviewed_user_id,
            ticketId: review.ticket_id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.created_at
          }));
          
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserReviews();
    }
  }, [userId]);

  if (loading) {
    return <div className="py-4 text-center text-muted-foreground">Loading reviews...</div>;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">User Reviews</h3>
        {userProfile && (
          <UserRatingBadge 
            rating={userProfile.avgRating || null} 
            reviewCount={userProfile.reviewCount || 0}
          />
        )}
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground border rounded-md bg-muted/10">
          No reviews yet
        </div>
      )}
    </div>
  );
};

export default UserReviews;
