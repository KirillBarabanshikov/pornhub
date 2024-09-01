import { ReactNode } from 'react';
import AudioIcon from '@/shared/assets/icons/audio.svg?react';

export type TAudioSourceValue = 'microphone' | 'system_sound';

export interface IAudioSourcesData {
    icon: ReactNode;
    text: string;
    value: TAudioSourceValue;
}

export const audioSourcesData: IAudioSourcesData[] = [
    { icon: <AudioIcon />, text: 'Захват микрофона', value: 'microphone' },
    { icon: <AudioIcon />, text: 'Захват системных звуков', value: 'system_sound' },
];
