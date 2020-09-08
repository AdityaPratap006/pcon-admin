import React from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../LoadingSpinner';

const UserCard = (props) => {
    const { user, updating, approveUser } = props;

    const approveUserHandler = (e) => {
        e.preventDefault();
        approveUser(user.id);
    }

    return (
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
                    {!updating && (
                        <CustomButton onClick={approveUserHandler} className={styles['approve-btn']}>
                            APPROVE
                        </CustomButton>
                    )}
                    {updating && (
                        <LoadingSpinner />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default UserCard;
