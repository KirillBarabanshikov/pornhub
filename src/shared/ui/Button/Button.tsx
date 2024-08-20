import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => {
    return (
        <button className={clsx(styles.button, className)} {...props}>
            {children}
        </button>
    );
};
