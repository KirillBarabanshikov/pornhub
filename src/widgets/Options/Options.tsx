import { FC, useState } from 'react';
import clsx from 'clsx';
import { Button, Dropdown, FileDropzone, IconButton, Input, Modal } from '@/shared/ui';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import CameraIcon from '@/shared/assets/icons/camera.svg?react';
import styles from './Options.module.scss';
import { Reorder } from 'framer-motion';

interface IOptionsProps {
    className?: string;
}

const initialItems = [1, 2, 3];

export const Options: FC<IOptionsProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(initialItems);

    return (
        <div className={clsx(styles.options, className)}>
            <div className={styles.option}>
                <div className={styles.title}>Источник аудио</div>
                <div className={styles.sources}></div>
                <div className={styles.actions}>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <PlusIcon />
                    </IconButton>
                    <IconButton>
                        <TrashIcon />
                    </IconButton>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.title}>Источник видео</div>
                <div className={styles.sources}>
                    <Reorder.Group axis='y' onReorder={setItems} values={items} layoutScroll>
                        {items.map((item) => {
                            return (
                                <Reorder.Item key={item} value={item} id={`${item}`}>
                                    <div className={styles.source}>
                                        <div className={styles.icon}>
                                            <CameraIcon />
                                        </div>
                                        <p>Захват веб-камеры</p>
                                    </div>
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                </div>
                <div className={styles.actions}>
                    <IconButton>
                        <PlusIcon />
                    </IconButton>
                    <IconButton>
                        <TrashIcon />
                    </IconButton>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.title}>Python scripts</div>
                <div className={styles.sources}>
                    <FileDropzone />
                </div>
                <div className={styles.actions}>
                    <IconButton>
                        <PlusIcon />
                    </IconButton>
                    <IconButton>
                        <TrashIcon />
                    </IconButton>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={'Редактирование скрипта'}>
                <Input label={'Текст на вотермарке'} />
                <Dropdown label={'Положение вотермарка'} />
                <Button>Подтвердить</Button>
            </Modal>
        </div>
    );
};
