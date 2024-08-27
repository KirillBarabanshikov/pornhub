import { FC, useState } from 'react';
import clsx from 'clsx';
import { Button, Dropdown, FileDropzone, IconButton, Input, Modal } from '@/shared/ui';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import styles from './Options.module.scss';
import { useScriptMutation } from '@/entities/script/api';
import { FileWithPath } from 'react-dropzone';
import { VideoSources } from '@/widgets/Options/ui';
import { useConfigQuery } from '@/entities/config';

interface IOptionsProps {
    className?: string;
}

export const Options: FC<IOptionsProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate } = useScriptMutation();
    const { data } = useConfigQuery();

    const loadScript = (files: FileWithPath[]) => {
        mutate({ scriptArchive: files[0], source: 'screen', action: 'load' });
    };

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
            {data && <VideoSources data={data} />}
            <div className={styles.option}>
                <div className={styles.title}>Python scripts</div>
                <div className={styles.sources}>
                    <FileDropzone onChange={(files) => loadScript(files)} />
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
