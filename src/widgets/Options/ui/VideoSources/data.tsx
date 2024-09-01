import { ReactNode } from 'react';
import PCIcon from '@/shared/assets/icons/pc.svg?react';
import CameraIcon from '@/shared/assets/icons/camera.svg?react';

export type TVideoSourceValue = 'screen' | 'webcam';

export interface IVideoSourcesData {
    icon: ReactNode;
    text: string;
    value: TVideoSourceValue;
}

export const videoSourcesData: IVideoSourcesData[] = [
    { icon: <PCIcon />, text: 'Захват экрана', value: 'screen' },
    { icon: <CameraIcon />, text: 'Захват веб-камеры', value: 'webcam' },
];
