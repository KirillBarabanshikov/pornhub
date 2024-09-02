import { FC, PropsWithChildren, useState } from 'react';
import { DraggableData, Rnd, RndResizeCallback, RndDragEvent } from 'react-rnd';
import clsx from 'clsx';
import styles from './Screen.module.scss';
import { useConfigQuery } from '@/entities/config';
import { ScreenCapture } from '@/widgets/Screen/ui/ScreenCapture';

interface IScreenProps {
    className?: string;
}

export const Screen: FC<IScreenProps> = ({ className }) => {
    const { data } = useConfigQuery();

    if (!data) return <></>;

    return (
        <div className={clsx(styles.screen, className)}>
            {data.config.video_sources.screen.show && (
                <Resource>
                    <ScreenCapture />
                </Resource>
            )}

            {/*{Array.from({ length: 3 }).map((_, index) => {*/}
            {/*    return <Resource key={index} />;*/}
            {/*})}*/}
        </div>
    );
};

const Resource: FC<PropsWithChildren> = ({ children }) => {
    const [[width, height], setSize] = useState([200, 100]);
    const [[x, y], setPosition] = useState([0, 0]);

    const handleResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
        setSize([parseInt(ref.style.width), parseInt(ref.style.height)]);
        setPosition([position.x, position.y]);
        console.log(e, direction, ref, delta);
    };

    const handleDragStop = (e: RndDragEvent, d: DraggableData) => {
        setPosition([d.x, d.y]);
        console.log(e, d);
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
