import { FC, useState } from 'react';
import clsx from 'clsx';
import { FileWithPath } from 'react-dropzone';
import { Button, Modal } from '@/shared/ui';
import AudioIcon from '@/shared/assets/icons/audio.svg?react';
import VideoIcon from '@/shared/assets/icons/camera.svg?react';
import ScreenIcon from '@/shared/assets/icons/pc.svg?react';
import styles from './UploadScriptModal.module.scss';
import { useScriptMutation } from '@/entities/config/api';

interface IUploadScriptModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    files: FileWithPath[];
}

export const UploadScriptModal: FC<IUploadScriptModalProps> = ({ isOpen, setIsOpen, files }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedChildSource, setSelectedChildSource] = useState('');
    const [showChildSource, setShowChildSource] = useState(false);
    const { mutateAsync: loadScript } = useScriptMutation();

    const handleClose = () => {
        setIsOpen(false);
        setSelectedSource('');
        setSelectedChildSource('');
        setShowChildSource(false);
    };

    const handleAccept = async () => {
        if (showChildSource) {
            await loadScript({ scriptArchive: files[0], source: selectedChildSource, action: 'load' });
            return handleClose();
        }

        setShowChildSource(true);
    };

    const disabled = !selectedSource || (showChildSource && !selectedChildSource);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={'Выберите источник'}>
            <div className={styles.modalContent}>
                {!showChildSource ? (
                    <div className={styles.sourcesList}>
                        {sources.map((source, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSource(source.value)}
                                    className={clsx(styles.source, selectedSource === source.value && styles.selected)}
                                >
                                    <div className={styles.icon}>{source.icon}</div>
                                    <p>{source.text}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.sourcesList}>
                        {sources
                            .find((source) => source.value === selectedSource)
                            ?.children.map((source, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedChildSource(source.value)}
                                        className={clsx(
                                            styles.source,
                                            selectedChildSource === source.value && styles.selected,
                                        )}
                                    >
                                        <div className={styles.icon}>{source.icon}</div>
                                        <p>{source.text}</p>
                                    </div>
                                );
                            })}
                    </div>
                )}
                <Button fullWidth disabled={disabled} onClick={handleAccept}>
                    Подтвердить
                </Button>
            </div>
        </Modal>
    );
};

const sources = [
    {
        icon: <AudioIcon />,
        text: 'Аудио',
        value: 'audio',
        children: [
            {
                icon: <AudioIcon />,
                text: 'Захват микофона',
                value: 'microphone',
            },
            {
                icon: <AudioIcon />,
                text: 'Захват микофона',
                value: 'system_sound',
            },
        ],
    },
    {
        icon: <VideoIcon />,
        text: 'Видео',
        value: 'video',
        children: [
            {
                icon: <VideoIcon />,
                text: 'Захват веб-камеры',
                value: 'webcam',
            },
            {
                icon: <ScreenIcon />,
                text: 'Захват экрана',
                value: 'screen',
            },
        ],
    },
];
