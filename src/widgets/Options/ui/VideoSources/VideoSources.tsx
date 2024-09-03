import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Reorder } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { IConfigData } from '@/entities/config';
import { IconButton, PopupMenu } from '@/shared/ui';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import { videoSourcesData, type TVideoSourceValue, IVideoSourcesData } from './data';
import optionsStyles from '../../Options.module.scss';
import { useConfigStore } from '@/entities/config/model';

interface IVideoSourcesProps {
    data: IConfigData;
}

export const VideoSources: FC<IVideoSourcesProps> = ({ data }) => {
    const sortedVideoSourcesData = videoSourcesData.sort((a, b) => {
        const aIndex = data.config.video_sources[a.value]['z-index'];
        const bIndex = data.config.video_sources[b.value]['z-index'];

        return aIndex - bIndex;
    });

    const [items, setItems] = useState(sortedVideoSourcesData);
    const [focusedItems, setFocusedItems] = useState<TVideoSourceValue[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef(null);
    const queryClient = useQueryClient();
    const { setScreenStream, clearScreenStream, screenStream } = useConfigStore((state) => state);

    const filteredVideoSourcesData = videoSourcesData.filter((item) => !data.config.video_sources[item.value].show);

    useEffect(() => {
        if (data.config.video_sources.screen.show && !screenStream) {
            startScreenStream();
        }
    }, [data]);

    const startScreenStream = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia();
            setScreenStream(screenStream);
        } catch (error) {
            throw error;
        }
    };

    const handleShowSource = async (value: TVideoSourceValue) => {
        try {
            if (value === 'screen') {
                await startScreenStream();
            }
            const newConfig = data.config;
            newConfig.video_sources[value].show = true;
            queryClient.setQueryData(['config'], { config: newConfig, updateAspects: [value], updateType: 'full' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleHideSources = () => {
        const newConfig = data.config;
        focusedItems.forEach((item) => {
            if (item === 'screen') {
                clearScreenStream();
            }

            newConfig.video_sources[item].show = false;
        });
        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: focusedItems, updateType: 'full' });
        setFocusedItems([]);
    };

    const handleFocusSource = (value: TVideoSourceValue) => {
        if (isDragging) return;

        if (focusedItems.includes(value)) {
            setFocusedItems(focusedItems.filter((item) => item !== value));
        } else {
            setFocusedItems([...focusedItems, value]);
        }
    };

    const handleReorder = (newOrder: IVideoSourcesData[]) => {
        const newConfig = data.config;

        newOrder.forEach((item, index) => {
            newConfig.video_sources[item.value]['z-index'] = index;
        });

        queryClient.setQueryData(['config'], {
            config: newConfig,
            updateAspects: ['screen', 'webcam'],
            updateType: 'full',
        });
    };

    return (
        <div className={optionsStyles.option}>
            <div className={optionsStyles.title}>Источник видео</div>
            <Reorder.Group
                axis='y'
                values={items}
                onReorder={(newOrder) => {
                    setItems(newOrder);
                    handleReorder(newOrder);
                }}
                layoutScroll
                ref={constraintsRef}
                className={optionsStyles.sources}
            >
                {items.map((item) => {
                    const source = data.config.video_sources[item.value];

                    if (!source.show) {
                        return <Fragment key={item.value} />;
                    }

                    return (
                        <Reorder.Item
                            key={item.value}
                            value={item}
                            id={item.value}
                            dragElastic={0.05}
                            dragConstraints={constraintsRef}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                            onClick={() => handleFocusSource(item.value)}
                        >
                            <div
                                className={clsx(
                                    optionsStyles.source,
                                    focusedItems.includes(item.value) && optionsStyles.focused,
                                )}
                            >
                                <div className={optionsStyles.icon}>{item.icon}</div>
                                <p>{item.text}</p>
                            </div>
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
            <div className={optionsStyles.actions}>
                <PopupMenu
                    items={filteredVideoSourcesData}
                    onSelect={(value) => handleShowSource(value as TVideoSourceValue)}
                >
                    <IconButton disabled={!filteredVideoSourcesData.length}>
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
