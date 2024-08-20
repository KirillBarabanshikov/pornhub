import { Options, Screen } from '@/widgets';
import styles from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <div className={styles.mainPage}>
            <Screen />
            <Options />
        </div>
    );
};
