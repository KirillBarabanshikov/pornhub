import { FC } from 'react';
import clsx from 'clsx';
import { VideoSources, AudioSources } from '@/widgets/Options/ui';
import { useConfigQuery } from '@/entities/config';
import styles from './Options.module.scss';

interface IOptionsProps {
    className?: string;
}

export const Options: FC<IOptionsProps> = ({ className }) => {
    const { data } = useConfigQuery();

    if (!data) return <></>;

    return (
        <div className={clsx(styles.options, className)}>
            <AudioSources data={data} />
            <VideoSources data={data} />
        </div>
    );
};
