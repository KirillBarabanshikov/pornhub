import { FC, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useScriptMutation } from '@/entities/config/api';
import { useQueryClient } from '@tanstack/react-query';
import { IConfigData, IScript } from '@/entities/config';
import { Button, FileDropzone, IconButton, PopupMenu } from '@/shared/ui';
import { UploadScriptModal } from '@/feature/uploadScript';
import AudioIcon from '@/shared/assets/icons/audio.svg?react';
import VideoIcon from '@/shared/assets/icons/camera.svg?react';
import PlusIcon from '@/shared/assets/icons/plus-lg.svg?react';
import TrashIcon from '@/shared/assets/icons/trash-fill.svg?react';
import PencilIcon from '@/shared/assets/icons/pencil-fill.svg?react';
import { scriptsData, TScript } from './data.tsx';
import optionsStyles from '../../Options.module.scss';
import styles from './Scripts.module.scss';

interface IScriptsProps {
    data: IConfigData;
}

export const Scripts: FC<IScriptsProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [focusedItems, setFocusedItems] = useState<TScript[]>([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [showChildSource, setShowChildSource] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: deleteScript } = useScriptMutation();

    const handleOnFilesChange = (files: FileWithPath[]) => {
        setFiles(files);
        setIsOpen(true);
    };

    const handleEnableScript = (script: TScript) => {
        const newConfig = data.config as Record<string, any>;
        const currentScript = newConfig[script.sourceGroupKey][script.sourceKey].external_scripts.find(
            (item: any) => item.name === script.name,
        );
        currentScript.enabled = !currentScript.enabled;

        queryClient.setQueryData(['config'], {
            config: newConfig,
            updateAspects: [script.sourceKey],
            updateType: 'full',
        });
    };

    const handleFocusScript = (script: TScript) => {
        if (focusedItems.find((item) => item.name === script.name)) {
            setFocusedItems(focusedItems.filter((item) => item.name !== script.name));
        } else {
            setFocusedItems([...focusedItems, script]);
        }
    };

    const handleDeleteScripts = () => {
        focusedItems.forEach((script) => {
            deleteScript({ source: script.sourceKey, action: 'delete', scriptName: script.name });
        });
        setFocusedItems([]);
    };

    const handleSelectSource = (source: string) => {
        setSelectedSource(source);
        setShowChildSource(true);
        setIsOpen(true);
    };

    const scripts: TScript[] = Object.entries(data.config).flatMap(([sourceGroupKey, sourceGroup]) =>
        Object.entries(sourceGroup as Record<string, { external_scripts: IScript[] }>).flatMap(([sourceKey, source]) =>
            typeof source.external_scripts !== 'undefined'
                ? source.external_scripts.map((script) => ({
                      ...script,
                      title: scriptsData[sourceKey].title,
                      icon: scriptsData[sourceKey].icon,
                      sourceGroupKey,
                      sourceKey,
                  }))
                : [],
        ),
    );

    return (
        <div className={optionsStyles.option}>
            <div className={optionsStyles.title}>Python scripts</div>
            {scripts.length ? (
                <div className={optionsStyles.sources}>
                    {scripts.map((script) => {
                        return (
                            <Script
                                script={script}
                                focusedItems={focusedItems}
                                handleFocusScript={handleFocusScript}
                                handleEnableScript={handleEnableScript}
                            />
                        );
                    })}
                </div>
            ) : (
                <FileDropzone onChange={handleOnFilesChange} />
            )}
            <div className={optionsStyles.actions}>
                <PopupMenu
                    items={[
                        { icon: <AudioIcon />, text: 'Скрипт для аудио', value: 'audio' },
                        { icon: <VideoIcon />, text: 'Скрипт для видео', value: 'video' },
                    ]}
                    onSelect={handleSelectSource}
                >
                    <IconButton>
                        <PlusIcon />
                    </IconButton>
                </PopupMenu>
                <IconButton onClick={handleDeleteScripts} disabled={!focusedItems.length}>
                    <TrashIcon />
                </IconButton>
            </div>
            <UploadScriptModal
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
                files={files}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                showChildSource={showChildSource}
                setShowChildSource={setShowChildSource}
                setFiles={setFiles}
            />
        </div>
    );
};

interface IScriptProps {
    script: TScript;
    focusedItems: TScript[];
    handleFocusScript: (script: TScript) => void;
    handleEnableScript: (script: TScript) => void;
}

const Script: FC<IScriptProps> = ({ script, focusedItems, handleFocusScript, handleEnableScript }) => {
    return (
        <div
            key={script.name}
            className={clsx(
                styles.script,
                script.enabled && styles.active,
                focusedItems.find((item) => item.name === script.name) && styles.focused,
            )}
        >
            <motion.div animate={{ width: script.enabled ? '100%' : 'initial' }}>
                <div className={styles.body} onClick={() => handleFocusScript(script)}>
                    <div className={styles.icon}>{script.icon}</div>
                    <div className={styles.content}>
                        <p className={styles.name}>{script.name}</p>
                        <span className={styles.title}>{script.title}</span>
                        <Button className={styles.button}>
                            <PencilIcon />
                            Изменить параметры
                        </Button>
                    </div>
                </div>
            </motion.div>
            <div className={styles.action} onClick={() => handleEnableScript(script)}>
                <p>{script.enabled ? 'Активирован' : 'Активировать'}</p>
            </div>
        </div>
    );
};
