import { FC, InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: FC<IInputProps> = ({ label, className, ...props }) => {
    const id = useId();

    return (
        <div className={clsx(styles.input, className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input type='text' id={id} {...props} />
        </div>
    );
};
