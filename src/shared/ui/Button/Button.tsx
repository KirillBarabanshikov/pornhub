import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({ children, fullWidth = false, className, ...props }) => {
    return (
        <button className={clsx(styles.button, fullWidth && styles.fullWidth, className)} {...props}>
            {children}
        </button>
    );
};
