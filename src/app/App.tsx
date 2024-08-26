import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/shared/styles/index.css';
import { MainPage } from '@/pages';
import { WebSocketProvider } from './providers/WebSocketProvider.tsx';

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
