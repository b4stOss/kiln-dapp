import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css';
import App from './App.tsx';
import { config } from './lib/wagmi';

const queryClient = new QueryClient();

const theme = createTheme({
  primaryColor: 'black',
  colors: {
    black: [
      '#ffffff', // 0 - blanc
      '#f8f9fa', // 1 - gris très clair
      '#e9ecef', // 2 - gris clair
      '#dee2e6', // 3 - gris
      '#ced4da', // 4 - gris moyen
      '#adb5bd', // 5 - gris foncé
      '#6c757d', // 6 - gris très foncé
      '#495057', // 7 - presque noir
      '#212529', // 8 - très foncé
      '#000000'  // 9 - noir pur
    ]
  },
  components: {
    Button: {
      defaultProps: {
        color: 'black',
        variant: 'filled'
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  </StrictMode>,
);
