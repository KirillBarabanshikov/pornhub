import { FC, PropsWithChildren, useEffect } from 'react';

export const WebsocketProvider: FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost/config');
        websocket.onopen = () => {
            console.log('connected');
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };

        return () => {
            websocket.close();
        };
    }, []);

    return <>{children}</>;
};
