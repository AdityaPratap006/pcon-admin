import React from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../../components/ScreenTitle';
import Grid from '../../../components/Grid';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../../navigation/routes';

const TeamScreen = () => {
    return (
        <div className={styles['team-screen']}>
            <ScreenTitle>TEAM</ScreenTitle>
            <Grid>

            </Grid>
            <Link to={`${navigationRoutes.TEAM}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default TeamScreen;
