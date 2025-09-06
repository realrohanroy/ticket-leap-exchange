
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingButton } from '@/components/common/LoadingButton';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { reviewFormSchema, type ReviewFormData } from '@/schemas/reviewSchema';

interface ReviewFormProps {
  ticketId: string;
  reviewedUserId: string;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  isSubmitting: boolean;
  error?: string;
  onRetry?: () => void;
  onDismissError?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  ticketId,
  reviewedUserId,
  onSubmit,
  isSubmitting,
  error,
  onRetry,
  onDismissError
}) => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: '',
      ticketId,
      reviewedUserId
    },
  });

  const [hoveredRating, setHoveredRating] = React.useState(0);
  const rating = form.watch('rating');

  const handleSubmit = async (values: ReviewFormData) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {error && (
          <ErrorAlert 
            message={error}
            onRetry={onRetry}
            onDismiss={onDismissError}
          />
        )}
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Rate your experience</p>
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          (hoveredRating || field.value) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this user..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton 
          type="submit" 
          className="w-full" 
          isLoading={isSubmitting}
          loadingText="Submitting..."
          disabled={rating === 0}
        >
          Submit Review
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ReviewForm;
