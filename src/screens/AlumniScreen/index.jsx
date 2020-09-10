import React from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../navigation/routes';

const AlumniScreen = () => {

    const renderedCards = [...Array(10).keys()].map(alumni => {
        return (
            <div key={alumni} className={styles['alumni-item']}>
                <Card className={styles['alumni-card']}>

                </Card>
            </div>
        );
    });

    return (
        <div className={styles['alumni-screen']}>
            <ScreenTitle>ALUMINI</ScreenTitle>
            <Grid className={styles['grid']}>
                {renderedCards}
            </Grid>
            <Link to={`${navigationRoutes.ALUMINI}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default AlumniScreen;
