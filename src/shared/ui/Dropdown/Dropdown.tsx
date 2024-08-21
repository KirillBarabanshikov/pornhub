import { FC, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import DropdownIcon from '@/shared/assets/icons/caret-down-fill.svg?react';
import styles from './Dropdown.module.scss';
import { useOutsideClick } from '@/shared/lib';

interface IDropdownProps {
    label?: string;
    className?: string;
}

export const Dropdown: FC<IDropdownProps> = ({ label, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={clsx(styles.dropdownWrap, className)}>
            {label && <label>{label}</label>}
            <div className={styles.dropdown} ref={ref}>
                <div onClick={toggleDropdown} className={styles.dropdownButton}>
                    Слева
                    <DropdownIcon />
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.dropdownList}
                        >
                            <div className={clsx(styles.dropdownListItem, styles.selected)}>Слева</div>
                            <div className={styles.dropdownListItem}>Снизу</div>
                            <div className={styles.dropdownListItem}>По центру</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
