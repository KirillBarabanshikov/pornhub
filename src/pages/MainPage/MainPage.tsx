import { Options, Screen } from '@/widgets';
import styles from './MainPage.module.scss';
import { useConfigQuery } from '@/entities/config';

export const MainPage = () => {
    useConfigQuery();

    return (
        <div className={styles.mainPage}>
            <Screen className={styles.screen} />
            <Options className={styles.options} />
        </div>
    );
};
