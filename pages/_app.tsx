import '../styles/globals.css';
import type {AppProps} from 'next/app';

import {useState} from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RecoilRoot} from 'recoil';
import Layout from '../components/layout';

function MyApp({Component, pageProps}) {
    // react-query setting
    const [queryClient] = useState(() => new QueryClient());

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
