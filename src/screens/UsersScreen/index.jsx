import React from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';

const UsersScreen = () => {
    return (
        <div className={styles['users-screen']}>
            <h3>Users who applied for verification</h3>
            <Grid className={styles['grid']}>
                <div className={styles['user-item']}>
                    <Card className={styles['user-card']}>
                        <Avatar src={''} className={styles['avatar']} />
                        <div className={styles['body']}>
                            <span>{'name'}</span>
                            <span>{'email'}</span>
                            <span>{'branch'}</span>
                            <span>{'reg no.'}</span>
                        </div>
                        <div className={styles['footer']}>
                            <CustomButton className={styles['approve-btn']}>
                                APPROVE
                            </CustomButton>
                        </div>
                    </Card>
                </div>
            </Grid>
        </div>
    );
};

export default UsersScreen;
