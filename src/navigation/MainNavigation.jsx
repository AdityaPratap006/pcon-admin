import React from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';

import MainHeader from './MainHeader';
import { navigationRoutes } from './routes';

const MainNavigation = () => {
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
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
