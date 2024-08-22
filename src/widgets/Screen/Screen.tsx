import { useState } from 'react';
import { DraggableData, Rnd, RndResizeCallback, RndDragEvent } from 'react-rnd';
import styles from './Screen.module.scss';

export const Screen = () => {
    return (
        <div className={styles.screen}>
            {Array.from({ length: 3 }).map((_, index) => {
                return <Resource key={index} />;
            })}
        </div>
    );
};

const Resource = () => {
    const [[width, height], setSize] = useState([100, 100]);
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
        />
    );
};
