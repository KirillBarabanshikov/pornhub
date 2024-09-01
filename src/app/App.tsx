import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from '@/pages';
import { WebSocketProvider } from './providers/WebSocketProvider.tsx';

import '@/shared/styles/index.css';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <WebSocketProvider>
                <MainPage />
            </WebSocketProvider>
        </QueryClientProvider>
    );
};
