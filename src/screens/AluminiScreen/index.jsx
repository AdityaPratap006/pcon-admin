import React from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../navigation/routes';

const AluminiScreen = () => {

    const renderedCards = [...Array(10).keys()].map(alumini => {
        return (
            <div key={alumini} className={styles['alumini-item']}>
                <Card className={styles['alumini-card']}>

                </Card>
            </div>
        );
    });

    return (
        <div className={styles['alumini-screen']}>
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

export default AluminiScreen;
