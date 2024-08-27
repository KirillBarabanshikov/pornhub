import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { WEBSOCKET_URL } from '@/shared/consts';

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const ws = new WebSocket(`${WEBSOCKET_URL}/config`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = (event) => {
            console.log('WebSocket closed:', event.reason);
        };

        setWebsocket(ws);

        return () => ws.close();
    }, []);

    useEffect(() => {
        if (!websocket) return;

        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
            if (event.type === 'updated' && event.query.queryKey[0] === 'config') {
                const newConfig = queryClient.getQueryData(['config']);
                console.log('config updated:', newConfig);

                if (websocket.readyState === websocket.OPEN) {
                    websocket.send(
                        JSON.stringify({
                            update_type: 'full',
                            update_aspects: ['webcam', 'screen'],
                            config: newConfig,
                        }),
                    );
                }
            }
        });

        return () => unsubscribe();
    }, [queryClient, websocket]);

    return <>{children}</>;
};
