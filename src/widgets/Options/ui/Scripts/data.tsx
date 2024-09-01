import { ReactNode } from 'react';
import { IScript } from '@/entities/config';
import WebcamIcon from '@/shared/assets/icons/camera.svg?react';
import ScreenIcon from '@/shared/assets/icons/pc.svg?react';
import AudioIcon from '@/shared/assets/icons/audio.svg?react';

export type TScript = IScript & { title: string; icon: ReactNode; sourceGroupKey: string; sourceKey: string };

export const scriptsData: Record<string, { title: string; icon: ReactNode }> = {
    webcam: {
        title: 'Захват веб-камеры',
        icon: <WebcamIcon />,
    },
    screen: {
        title: 'Захват экрана',
        icon: <ScreenIcon />,
    },
    microphone: {
        title: 'Захват микрофона',
        icon: <AudioIcon />,
    },
    system_sound: {
        title: 'Захват системных звуков',
        icon: <AudioIcon />,
    },
};
