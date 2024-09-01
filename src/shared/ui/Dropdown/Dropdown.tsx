import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/shared/lib';
import DropdownIcon from '@/shared/assets/icons/caret-down-fill.svg?react';
import styles from './Dropdown.module.scss';

interface IDropdownOption {
    label: string;
    value: string | number;
}

interface IDropdownProps {
    options: IDropdownOption[];
    selectedValue: string | number;
    onSelectedChange: (selected: string | number) => void;
    label?: string;
    size?: 'small' | 'default';
    className?: string;
}

export const Dropdown: FC<IDropdownProps> = ({
    options,
    selectedValue,
    onSelectedChange,
    label,
    size = 'default',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (e: React.MouseEvent, value: string | number) => {
        e.stopPropagation();
        onSelectedChange(value);
        setIsOpen(false);
    };

    return (
        <div className={clsx(styles.dropdownWrap, styles[size], className)}>
            {label && <label>{label}</label>}
            <div className={styles.dropdown} ref={ref}>
                <div onClick={toggleDropdown} className={styles.dropdownButton}>
                    <span>{options.find(({ value }) => value === selectedValue)?.label}</span>
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
                            {options.map((option) => {
                                return (
                                    <div
                                        key={option.value}
                                        onClick={(e) => handleSelect(e, option.value)}
                                        className={clsx(
                                            styles.dropdownListItem,
                                            option.value === selectedValue && styles.selected,
                                        )}
                                    >
                                        <span>{option.label}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
