import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ children, className, ...props }) => {
    return (
        <button className={clsx(className)} {...props}>
            {children}
        </button>
    );
};
