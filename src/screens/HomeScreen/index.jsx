import React from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { navigationRoutes } from '../../navigation/routes';
import { IconContext } from 'react-icons';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';

const HomeScreen = () => {
    return (

        <div className={styles['home-screen']}>
            <IconContext.Provider value={{
                className: styles['icon']
            }}>
                <Grid className={styles['grid']}>
                    <Card className={styles['card']}>
                        <div className={styles['body']} style={{ color: '#9c27b0' }}>
                            <FaUsers />
                            <h2>USERS</h2>
                        </div>
                        <CustomButton to={navigationRoutes.USERS}>
                            MANAGE
                    </CustomButton>
                    </Card>
                    <Card className={styles['card']}>
                        <div className={styles['body']} style={{ color: '#2196f3' }}>
                            <FaUserTie />
                            <h2>INTERVIEW EXPERIENCES</h2>
                        </div>
                        <CustomButton to={navigationRoutes.INTERVIEW_EXPERIENCES}>
                            MANAGE
                    </CustomButton>
                    </Card>
                    <Card className={styles['card']}>
                        <div className={styles['body']} style={{ color: '#43a047' }}>
                            <MdNotificationsActive />
                            <h2>NOTIFICATIONS</h2>
                        </div>
                        <CustomButton to={navigationRoutes.NOTIFICATIONS}>
                            MANAGE
                    </CustomButton>
                    </Card>
                </Grid>
            </IconContext.Provider>
        </div>
    );
};

export default HomeScreen;