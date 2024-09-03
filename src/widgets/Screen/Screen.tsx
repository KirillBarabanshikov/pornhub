import { FC, PropsWithChildren, useState } from 'react';
import { DraggableData, Rnd, RndResizeCallback, RndDragEvent } from 'react-rnd';
import clsx from 'clsx';
import styles from './Screen.module.scss';
import { useConfigQuery } from '@/entities/config';
import { ScreenCapture } from '@/widgets/Screen/ui/ScreenCapture';
import { useQueryClient } from '@tanstack/react-query';

interface IScreenProps {
    className?: string;
}

export const Screen: FC<IScreenProps> = ({ className }) => {
    const { data } = useConfigQuery();
    const queryClient = useQueryClient();

    const onHandleResizeStop = (position: { x: number; y: number; width: number; height: number }) => {
        if (!data) return;

        const newConfig = data.config;
        newConfig.video_sources.screen.position = position;

        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: ['screen'], updateType: 'full' });
    };

    const onHandleDragStop = (position: { x: number; y: number }) => {
        if (!data) return;

        const newConfig = data.config;
        newConfig.video_sources.screen.position = { ...newConfig.video_sources.screen.position, ...position };

        queryClient.setQueryData(['config'], { config: newConfig, updateAspects: ['screen'], updateType: 'full' });
    };

    if (!data) return <></>;

    return (
        <div className={clsx(styles.screen, className)}>
            {data.config.video_sources.screen.show && (
                <Resource
                    onHandleResizeStop={onHandleResizeStop}
                    onHandleDragStop={onHandleDragStop}
                    position={data.config.video_sources.screen.position}
                >
                    <ScreenCapture />
                </Resource>
            )}

            {/*{Array.from({ length: 3 }).map((_, index) => {*/}
            {/*    return <Resource key={index} />;*/}
            {/*})}*/}
        </div>
    );
};

interface IResourceProps extends PropsWithChildren {
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    onHandleResizeStop: (position: { x: number; y: number; width: number; height: number }) => void;
    onHandleDragStop: (position: { x: number; y: number }) => void;
}

const Resource: FC<IResourceProps> = ({ position, onHandleResizeStop, onHandleDragStop, children }) => {
    const [[width, height], setSize] = useState([position.width, position.height]);
    const [[x, y], setPosition] = useState([position.x, position.y]);

    const handleResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
        setSize([parseInt(ref.style.width), parseInt(ref.style.height)]);
        setPosition([position.x, position.y]);
        console.log(e, direction, ref, delta);
        onHandleResizeStop({
            x: position.x,
            y: position.y,
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
        });
    };

    const handleDragStop = (e: RndDragEvent, d: DraggableData) => {
        setPosition([d.x, d.y]);
        console.log(e, d);
        onHandleDragStop({ x: d.x, y: d.y });
    };

    return (
        <Rnd
            size={{ width, height }}
            position={{ x, y }}
            onResizeStop={handleResizeStop}
            onDragStop={handleDragStop}
            className={styles.resource}
            bounds={'parent'}
            lockAspectRatio={true}
        >
            {children}
        </Rnd>
    );
};
