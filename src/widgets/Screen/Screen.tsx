import styles from './Screen.module.scss';
import 'react-resizable/css/styles.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const Screen = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const savedPosition = localStorage.getItem('blockPosition');
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition));
        }
    }, []);

    const handleDrag = (e, info) => {
        if (!constraintsRef.current) return;

        const rectScreen = constraintsRef.current.getBoundingClientRect();
        const rectTarget = e.target.getBoundingClientRect();

        console.log();

        const newPosition = { x: rectTarget.top - rectScreen.top, y: rectTarget.left - rectScreen.left };
        setPosition(newPosition);
        localStorage.setItem('blockPosition', JSON.stringify(newPosition));
    };

    return (
        <div>
            <motion.div ref={constraintsRef} className={styles.screen}>
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragMomentum={false}
                    dragElastic={0}
                    dragTransition={{}}
                    className={styles.resource}
                    onDrag={(e, info) => console.log(info)}
                />
            </motion.div>
        </div>
    );
};
