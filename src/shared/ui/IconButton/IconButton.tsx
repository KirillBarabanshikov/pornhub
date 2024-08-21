import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import styles from './IconButton.module.scss';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: FC<IIconButtonProps> = ({ children, ...props }) => {
    return (
        <button className={clsx(styles.iconButton)} {...props}>
            {children}
        </button>
    );
};
