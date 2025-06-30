
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";

const SpeedInsightsWrapper = () => {
  // Only render in production environment
  if (import.meta.env.DEV) {
    return null;
  }

  // Add error boundary for Speed Insights
  try {
    return (
      <SpeedInsights 
        beforeSend={(event) => {
          // Only send analytics for actual page views
          if (event.name === 'route-change' || event.name === 'beforeunload') {
            return event;
          }
          return event;
        }}
        sampleRate={1}
        route={window.location.pathname}
      />
    );
  } catch (error) {
    console.warn('Speed Insights failed to load:', error);
    return null;
  }
};

export default SpeedInsightsWrapper;
