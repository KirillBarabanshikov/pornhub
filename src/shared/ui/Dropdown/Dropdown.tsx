import { FC, useRef, useState } from 'react';
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
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setIsOpen(false));

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={clsx(styles.dropdownWrap, className)} ref={ref}>
            {label && <label>{label}</label>}
            <div className={styles.dropdown}>
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
                            <div className={styles.dropdownListItem}>Слева</div>
                            <div className={styles.dropdownListItem}>Слева</div>
                            <div className={styles.dropdownListItem}>Слева</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
