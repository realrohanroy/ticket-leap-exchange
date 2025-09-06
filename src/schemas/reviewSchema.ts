import { z } from 'zod';

export const reviewFormSchema = z.object({
  rating: z.number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating cannot exceed 5 stars'),
  comment: z.string()
    .max(500, 'Comment cannot exceed 500 characters')
    .optional(),
  ticketId: z.string()
    .min(1, 'Ticket ID is required'),
  reviewedUserId: z.string()
    .min(1, 'Reviewed user ID is required')
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;