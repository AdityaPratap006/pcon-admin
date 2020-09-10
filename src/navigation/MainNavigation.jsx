import React, { useContext } from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';

import MainHeader from './MainHeader';
import { navigationRoutes } from './routes';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../contexts/auth-context';

const MainNavigation = () => {
    const auth = useContext(AuthContext);

    return (
        <React.Fragment>
            <MainHeader className={styles['navigation']}>
                <section className={styles['left-section']}>
                    <h1 className={styles['title']}>
                        <NavLink exact to={navigationRoutes.HOME} activeClassName={styles['active']}>
                            PCON-ADMIN
                        </NavLink>
                    </h1>
                </section>
                <section className={styles['right-section']}>
                    {
                        auth.user && (
                            <CustomButton
                                onClick={auth.logout}
                                light
                            >
                                LOGOUT
                            </CustomButton>
                        )
                    }
                </section>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
