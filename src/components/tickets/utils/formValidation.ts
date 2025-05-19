
export const validateTicketForm = (formData: any) => {
  const errors: {[key: string]: boolean} = {};
  let hasErrors = false;
  
  // Required fields validation
  if (!formData.fromCity) {
    errors.fromCity = true;
    hasErrors = true;
  }
  
  if (!formData.toCity) {
    errors.toCity = true;
    hasErrors = true;
  }
  
  if (!formData.travelDate) {
    errors.travelDate = true;
    hasErrors = true;
  }
  
  if (!formData.contactInfo) {
    errors.contactInfo = true;
    hasErrors = true;
  }
  
  if (formData.mode === 'rail' || formData.mode === 'bus') {
    if (!formData.trainOrBusName) {
      errors.trainOrBusName = true;
      hasErrors = true;
    }
  } else if (formData.mode === 'car') {
    if (!formData.carModel) {
      errors.carModel = true;
      hasErrors = true;
    }
    
    if (!formData.seatsAvailable) {
      errors.seatsAvailable = true;
      hasErrors = true;
    }
  }
  
  if (!formData.ticketType) {
    errors.ticketType = true;
    hasErrors = true;
  }
  
  // Check if from and to cities are the same
  if (formData.fromCity && formData.toCity && formData.fromCity === formData.toCity) {
    errors.toCity = true;
    hasErrors = true;
  }
  
  return { errors, hasErrors };
};
