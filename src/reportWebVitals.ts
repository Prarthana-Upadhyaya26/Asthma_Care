import { 
  onCLS, 
  onLCP, 
  onFCP,
  onINP,  // Replace FID with Interaction to Next Paint (INP)
  Metric 
} from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onLCP(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);  // New recommended metric
  }
};

export default reportWebVitals;