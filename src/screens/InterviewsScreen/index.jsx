import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { interviewsCollectionRef } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import { navigationRoutes } from '../../navigation/routes';
import { getLocalDateFromFirebaseTimestamp } from '../../utils/dates';
import { GoVerified, GoUnverified } from 'react-icons/go';

const InterviewsScreen = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeInterviews = interviewsCollectionRef.onSnapshot(snapshot => {
            const interviewsList = snapshot.docs.map(interviewDoc => ({
                id: interviewDoc.id,
                ...interviewDoc.data(),
            }));

            setInterviews(interviewsList);
            setLoading(false);
        });

        return () => {
            unsubscribeInterviews();
        };
    }, []);


    const renderedInterviews = interviews.map(interview => {
        const localDate = getLocalDateFromFirebaseTimestamp(interview.createdAt);
        return (
            <Card key={interview.id} className={styles['interview-card']}>
                {interview.verified && (
                    <GoVerified className={styles['verified-icon']} />
                )}
                {!interview.verified && (
                    <GoUnverified className={styles['unverified-icon']} />
                )}
                <div className={styles['header']}>
                    <h2>{interview.companyName}</h2>
                    <span>{localDate}</span>
                </div>
                <div className={styles['content']}>
                    <Avatar src={interview.user?.photoURL} />
                    <span className={styles['name']}>{interview.user?.name}</span>
                    <span className={styles['email']}>{interview.user?.email}</span>
                    <span className={styles['regNum']}>{interview.user?.registrationNum}</span>
                    <span className={styles['branch']}>{interview.user?.branch}</span>
                </div>
                <div className={styles['footer']}>
                    <CustomButton to={`${navigationRoutes.INTERVIEW_EXPERIENCES}/${interview.id}`}>
                        VIEW
                    </CustomButton>
                </div>
            </Card>
        );
    });


    return (
        <div className={styles['interviews-screen']}>
            <h3 className={styles['screen-title']}>INTERVIEW EXPERIENCES</h3>
            {loading && <Card className={styles['loader-card']}><LoadingSpinner /></Card>}
            {!loading && !interviews.length && <h4>No interviews found!</h4>}
            <Grid className={styles['grid']}>
                {renderedInterviews}
            </Grid>
        </div>
    );
};

export default InterviewsScreen;
