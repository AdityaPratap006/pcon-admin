import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../navigation/routes';

const AchievementsScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            await new Promise(res => setTimeout(res, 500));
            setLoading(false);
        }

        fetchAchievements();

    }, []);

    const renderedCards = [...Array(10).keys()].map(ach => {
        return (
            <Card key={ach} className={styles['achievement-card']}>

            </Card>
        );
    });

    return (
        <div className={styles['achievements-screen']}>
            <ScreenTitle>ACHIEVEMENTS</ScreenTitle>
            {loading && (
                <LoadingSpinner />
            )}
            {!loading && (
                <Grid className={styles['grid']}>
                    {renderedCards}
                </Grid>
            )}
            <Link to={`${navigationRoutes.ACHIEVEMENTS}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default AchievementsScreen;
