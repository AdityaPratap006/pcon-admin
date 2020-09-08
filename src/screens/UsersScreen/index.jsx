import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import { usersCollectionRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const appliedAndUnverifiedUsersQuery = usersCollectionRef
            .where('appliedForVerification', '==', true)
            .where('verified', '==', false);

        const unsubscribeUnverifiedUsersSnapshot = appliedAndUnverifiedUsersQuery.onSnapshot(snapshot => {
            const usersList = snapshot.docs.map(userDoc => ({
                id: userDoc.id,
                ...userDoc.data(),
            }));

            setUsers(usersList);
            setLoading(false);
        });

        return () => {
            unsubscribeUnverifiedUsersSnapshot();
        };
    }, []);


    const renderedUsers = users.map(user => (
        <div key={user.id} className={styles['user-item']}>
            <Card className={styles['user-card']}>
                <Avatar src={user.photoURL} className={styles['avatar']} />
                <div className={styles['body']}>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{`Branch: ${user.branch}`}</span>
                    <span>{`Reg No.: ${user.registrationNum}`}</span>
                </div>
                <div className={styles['footer']}>
                    <CustomButton className={styles['approve-btn']}>
                        APPROVE
                    </CustomButton>
                </div>
            </Card>
        </div>
    ));

    return (
        <div className={styles['users-screen']}>
            <h3>Users who applied for verification</h3>
            {loading && <Card className={styles['loader-card']}><LoadingSpinner /></Card>}
            {!loading && !users.length && <h4>No active requests</h4>}
            <Grid className={styles['grid']}>
                {renderedUsers}
            </Grid>
        </div>
    );
};

export default UsersScreen;
