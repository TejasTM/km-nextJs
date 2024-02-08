// pages/_app.js
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useClient } from 'react-query/client';

function MyApp({ Component, pageProps }) {
  useClient(); // This marks the entire application as a Client Component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} {/* Devtools for development */}
    </QueryClientProvider>
  );
}

export default MyApp;
