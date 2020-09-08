import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import UserCard from '../../components/UserCard';
import { usersCollectionRef, updateUserProfileDocument } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState({
        id: undefined,
        status: false,
    });
    const [error, setError] = useState('');

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

    const approveUser = async (userId) => {

        setUpdating({
            id: userId,
            status: true,
        });
        try {
            await updateUserProfileDocument(userId, { verified: true });
        } catch (error) {
            setError(error.message);
        }
        setUpdating({
            id: userId,
            status: false,
        });
    }

    const clearErrorHandler = () => {
        setError('');
    }

    const renderedUsers = users.map(user => (
        <UserCard
            key={user.id}
            user={user}
            updating={updating.id === user.id && updating.status}
            approveUser={approveUser}
        />
    ));

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <div className={styles['users-screen']}>
                <h3>Users who applied for verification</h3>
                {loading && <Card className={styles['loader-card']}><LoadingSpinner /></Card>}
                {!loading && !users.length && <h4>No active requests</h4>}
                <Grid className={styles['grid']}>
                    {renderedUsers}
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default UsersScreen;
