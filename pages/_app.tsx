import '../styles/globals.css';
import type {AppProps} from 'next/app';

import {useState} from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RecoilRoot} from 'recoil';
import {SessionProvider} from 'next-auth/react';

function MyApp({Component, pageProps}) {
    // react-query setting
    const [queryClient] = useState(() => new QueryClient());

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <SessionProvider session={pageProps.session}>
                        <Component {...pageProps} />
                    </SessionProvider>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
