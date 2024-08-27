import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import styles from './PopupMenu.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/shared/lib';

interface IPopupMenuItem {
    icon: ReactNode;
    text: string;
    value: string;
}

interface IPopupMenuProps extends PropsWithChildren {
    items: IPopupMenuItem[];
    onSelect: (value: string) => void;
}

export const PopupMenu: FC<IPopupMenuProps> = ({ items, onSelect, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    const handleToggle = () => {
        if (!items.length) return;
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className={styles.popupMenuWrapper}>
            <div onClick={handleToggle} className={styles.trigger}>
                {children}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.popupMenu}
                    >
                        {items.map((item) => {
                            return (
                                <div
                                    key={item.value}
                                    onClick={() => handleSelect(item.value)}
                                    className={styles.popupMenuItem}
                                >
                                    {item.icon}
                                    <p>{item.text}</p>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
