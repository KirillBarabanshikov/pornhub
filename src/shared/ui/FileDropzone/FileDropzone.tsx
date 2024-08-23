import { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import FileIcon from '@/shared/assets/icons/file.svg?react';
import styles from './FileDropzone.module.scss';

export const FileDropzone = () => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={styles.fileDropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={styles.hint}>
                <div className={styles.icon}>
                    <FileIcon />
                </div>
                <p>Перетащите или загрузите свой скрипт</p>
            </div>
        </div>
    );
};
