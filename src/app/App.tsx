import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/shared/styles/index.css';
import { MainPage } from '@/pages';
import { WebsocketProvider } from './providers/WebsocketProvider.tsx';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <WebsocketProvider>
                <MainPage />
            </WebsocketProvider>
        </QueryClientProvider>
    );
};
