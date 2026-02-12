'use client';

import { Provider } from 'react-redux';
import { store } from './store';

export default function ReduxProvider({ children }) {
  // Simple debug log to confirm provider mounts
  if (typeof window !== 'undefined') {
    console.log('[ReduxProvider] Provider mounted');
  }
  return <Provider store={store}>{children}</Provider>;
}


