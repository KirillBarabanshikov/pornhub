import { ChangeEvent, FC, useRef, useState } from 'react';
import clsx from 'clsx';
import { FileWithPath } from 'react-dropzone';
import { Button, Modal } from '@/shared/ui';
import { useScriptMutation } from '@/entities/config/api';
import AudioIcon from '@/shared/assets/icons/audio.svg?react';
import VideoIcon from '@/shared/assets/icons/camera.svg?react';
import ScreenIcon from '@/shared/assets/icons/pc.svg?react';
import styles from './UploadScriptModal.module.scss';

interface IUploadScriptModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    files: FileWithPath[];
    selectedSource: string;
    setSelectedSource: (source: string) => void;
    showChildSource: boolean;
    setShowChildSource: (value: boolean) => void;
    setFiles: (files: FileWithPath[]) => void;
}

export const UploadScriptModal: FC<IUploadScriptModalProps> = ({
    isOpen,
    setIsOpen,
    files,
    selectedSource,
    setSelectedSource,
    showChildSource,
    setShowChildSource,
    setFiles,
}) => {
    const [selectedChildSource, setSelectedChildSource] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: loadScript } = useScriptMutation();

    const handleClose = () => {
        setIsOpen(false);
        setSelectedSource('');
        setSelectedChildSource('');
        setShowChildSource(false);
        setFiles([]);
    };

    const handleAccept = async () => {
        if (showChildSource) {
            const scriptArchive = files[0];

            if (!scriptArchive) {
                return fileInputRef.current?.click();
            }

            const scriptName = scriptArchive.name.split('.zip')[0];
            await loadScript({ scriptArchive, source: selectedChildSource, action: 'load', scriptName });
            return handleClose();
        }

        setShowChildSource(true);
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const scriptArchive = event.target.files[0];
        const scriptName = scriptArchive.name.split('.zip')[0];
        await loadScript({ scriptArchive, source: selectedChildSource, action: 'load', scriptName });
        handleClose();
    };

    const disabled = !selectedSource || (showChildSource && !selectedChildSource);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={'Выберите источник'}>
            <div className={styles.modalContent}>
                {!showChildSource ? (
                    <div className={styles.sourcesList}>
                        {sources.map((source) => {
                            return (
                                <div
                                    key={source.value}
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
                            ?.children.map((source) => {
                                return (
                                    <div
                                        key={source.value}
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
                        <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
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
