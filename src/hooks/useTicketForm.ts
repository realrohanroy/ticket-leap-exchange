import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketFormSchema, type TicketFormData } from '@/schemas/ticketSchema';
import { useAsyncOperation } from './useAsyncOperation';
import { validateAndShowCitiesError } from '@/lib/validation-utils';

export function useTicketForm(onSubmit: (data: TicketFormData) => Promise<void>) {
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      mode: 'rail',
      fromCity: '',
      toCity: '',
      travelDate: '',
      departureTime: '',
      ticketType: '',
      trainOrBusName: '',
      contactInfo: '',
      countryCode: '+91',
      additionalInfo: '',
      carModel: '',
      seatsAvailable: undefined
    },
    mode: 'onChange'
  });

  const { execute, isLoading, error } = useAsyncOperation({
    showSuccessToast: true,
    successMessage: 'Ticket posted successfully!',
    showErrorToast: true,
    errorMessage: 'Failed to post ticket'
  });

  const handleSubmit = useCallback(async (data: TicketFormData) => {
    // Final validation for same cities
    if (!validateAndShowCitiesError(data.fromCity, data.toCity)) {
      return;
    }

    await execute(() => onSubmit(data));
  }, [execute, onSubmit]);

  const swapCities = useCallback(() => {
    const fromCity = form.getValues('fromCity');
    const toCity = form.getValues('toCity');
    
    form.setValue('fromCity', toCity);
    form.setValue('toCity', fromCity);
  }, [form]);

  const resetForm = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    error,
    swapCities,
    resetForm
  };
}