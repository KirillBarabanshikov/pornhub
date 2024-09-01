import { FC, Fragment, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Dropdown, IconButton, PopupMenu } from '@/shared/ui';
import { IConfigData } from '@/entities/config';
import { useSoundDevicesQuery } from '@/entities/config/api';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import optionsStyles from '../../Options.module.scss';
import { audioSourcesData, TAudioSourceValue } from './data.tsx';
import styles from './AudioSources.module.scss';

interface IAudioSourcesProps {
    data: IConfigData;
}

export const AudioSources: FC<IAudioSourcesProps> = ({ data }) => {
    const [focusedItems, setFocusedItems] = useState<TAudioSourceValue[]>([]);
    const { data: soundDevices } = useSoundDevicesQuery();
    const queryClient = useQueryClient();

    const filteredAudioSourcesData = audioSourcesData.filter((item) => !data.config.audio_sources[item.value].show);

    const handleShowSource = (value: TAudioSourceValue) => {
        const newConfig = data.config;
        newConfig.audio_sources[value].show = true;
        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: [value], updateType: 'full' });
    };

    const handleHideSources = () => {
        const newConfig = data.config;
        focusedItems.forEach((item) => {
            newConfig.audio_sources[item].show = false;
        });
        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: focusedItems, updateType: 'full' });
        setFocusedItems([]);
    };

    const handleFocusSource = (value: TAudioSourceValue) => {
        if (focusedItems.includes(value)) {
            setFocusedItems(focusedItems.filter((item) => item !== value));
        } else {
            setFocusedItems([...focusedItems, value]);
        }
    };

    const handleSelectSoundDevice = (value: number) => {
        const newConfig = data.config;
        newConfig.audio_sources.microphone.device_input_index = value;
        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: ['microphone'], updateType: 'full' });
    };

    return (
        <div className={optionsStyles.option}>
            <div className={optionsStyles.title}>Источник аудио</div>
            <div className={optionsStyles.sources}>
                {audioSourcesData.map((item) => {
                    const source = data.config.audio_sources[item.value];

                    if (!source.show) {
                        return <Fragment key={item.value} />;
                    }

                    return (
                        <div
                            key={item.value}
                            onClick={() => handleFocusSource(item.value)}
                            className={clsx(
                                optionsStyles.source,
                                focusedItems.includes(item.value) && optionsStyles.focused,
                            )}
                        >
                            <div className={optionsStyles.icon}>{item.icon}</div>
                            <div>
                                <p>{item.text}</p>
                                {item.value === 'microphone' && soundDevices && (
                                    <Dropdown
                                        options={soundDevices
                                            .filter((device) => device.deviceType === 'input')
                                            .map((device) => ({
                                                label: device.name,
                                                value: device.index,
                                            }))}
                                        className={styles.dropdown}
                                        selectedValue={data.config.audio_sources.microphone.device_input_index}
                                        onSelectedChange={(value) => handleSelectSoundDevice(value as number)}
                                        size={'small'}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={optionsStyles.actions}>
                <PopupMenu
                    items={filteredAudioSourcesData}
                    onSelect={(value) => handleShowSource(value as TAudioSourceValue)}
                >
                    <IconButton disabled={!filteredAudioSourcesData.length}>
                        <PlusIcon />
                    </IconButton>
                </PopupMenu>
                <IconButton onClick={handleHideSources} disabled={!focusedItems.length}>
                    <TrashIcon />
                </IconButton>
            </div>
        </div>
    );
};
