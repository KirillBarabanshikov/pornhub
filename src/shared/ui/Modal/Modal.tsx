import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Modal.module.scss';

interface IModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
}

export const Modal: FC<IModalProps> = ({ children, isOpen, onClose, title, className }) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.overlay}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modalWrap}
                    >
                        <div className={clsx(styles.modal, className)}>
                            {title && <h2 className={styles.title}>{title}</h2>}
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.getElementById('portal') as HTMLDivElement,
    );
};
