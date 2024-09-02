import { FC, useEffect, useRef } from 'react';
import { useConfigStore } from '@/entities/config/model';

export const ScreenCapture: FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const stream = useConfigStore((state) => state.screenStream);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} autoPlay playsInline style={{ width: '100%', pointerEvents: 'none' }} />;
};
