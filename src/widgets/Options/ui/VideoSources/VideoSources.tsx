import { FC, Fragment, useRef, useState } from 'react';
import { IConfig } from '@/entities/config';
import { IconButton, PopupMenu } from '@/shared/ui';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import { videoSourcesData, type TVideoSourceValue, IVideoSourcesData } from './data';
import optionsStyles from '../../Options.module.scss';
import { Reorder } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

interface IVideoSourcesProps {
    config: IConfig;
}

export const VideoSources: FC<IVideoSourcesProps> = ({ config }) => {
    const [items, setItems] = useState(videoSourcesData);
    const constraintsRef = useRef(null);
    const queryClient = useQueryClient();

    const onSelect = (value: string) => {
        const newConfig = { someField: 'New Value' };
        queryClient.setQueryData(['config'], newConfig);

        console.log(config.video_sources[value as TVideoSourceValue]);
    };

    const onReorder = (newOrder: IVideoSourcesData[]) => {
        setItems(newOrder);
    };

    return (
        <div className={optionsStyles.option}>
            <div className={optionsStyles.title}>Источник видео</div>
            <Reorder.Group
                axis='y'
                values={items}
                onReorder={onReorder}
                layoutScroll
                ref={constraintsRef}
                className={optionsStyles.sources}
            >
                {items.map((item) => {
                    const source = config.video_sources[item.value];

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
                        >
                            <div className={optionsStyles.source}>
                                <div className={optionsStyles.icon}>{item.icon}</div>
                                <p>{item.text}</p>
                            </div>
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
            <div className={optionsStyles.actions}>
                <PopupMenu items={videoSourcesData} onSelect={onSelect}>
                    <IconButton>
                        <PlusIcon />
                    </IconButton>
                </PopupMenu>
                <IconButton>
                    <TrashIcon />
                </IconButton>
            </div>
        </div>
    );
};
