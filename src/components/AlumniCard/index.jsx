import React, { useState } from 'react';
import styles from './index.module.scss';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import LoadingSpinner from '../../components/LoadingSpinner';
import CustomButton from '../../components/CustomButton';
import { alumniRef } from '../../firebase/firebase.utils';

const AlumniCard = (props) => {
    const [updating, setUpdating] = useState(false);

    const { alumni } = props;

    const deleteAlumniHandler = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await alumniRef.child(alumni.id).remove();
        } catch (err) {
            setUpdating(false);
        }

    }

    return (
        <div className={styles['alumni-item']}>
            <Card className={styles['alumni-card']}>
                <Avatar src={alumni.photoURL} className={styles['avatar']} />
                <div className={styles['body']}>
                    <span>{alumni.name}</span>
                    <span>{alumni.company}</span>
                    <span>{`Class of ${alumni.batch}`}</span>

                </div>
                <div className={styles['footer']}>
                    {!updating && (
                        <CustomButton onClick={deleteAlumniHandler} className={styles['approve-btn']}>
                            DELETE
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

export default AlumniCard;
