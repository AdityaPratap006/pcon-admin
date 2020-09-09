import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { getInterviewDocument } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';
import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { getLocalDateFromFirebaseTimestamp } from '../../utils/dates';
import Avatar from '../../components/Avatar';
import CustomButton from '../../components/CustomButton';
import { updateInterviewDocument, deleteInterviewDocument } from '../../firebase/firebase.utils';
import ErrorModal from '../../components/ErrorModal';
import { navigationRoutes } from '../../navigation/routes';

const InterviewDetailScreen = (props) => {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const browserHistory = useHistory();

    const interviewId = props.match.params.interviewId;
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const interviewData = await getInterviewDocument(interviewId);
                setInterview(interviewData);
                console.log(interviewData);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        };

        fetchInterview();

    }, [interviewId]);

    if (!loading && !interview) {
        return (
            <div className={styles['interivew-detail-screen']}>
                <h2>Interview Not Found!</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles['interivew-detail-screen']} style={{ justifyContent: 'center' }}>
                <LoadingSpinner />
            </div>
        );
    }

    const approveInterview = async () => {

        setUpdating(true);

        try {
            await updateInterviewDocument(interviewId, { verified: true });
            setUpdating(false);
            browserHistory.push(navigationRoutes.INTERVIEW_EXPERIENCES);
        } catch (err) {
            setError(err.message);
        }


    }

    const rejectInterview = async () => {

        setUpdating(true);

        try {
            await deleteInterviewDocument(interviewId);
            setUpdating(false);
            browserHistory.replace(navigationRoutes.INTERVIEW_EXPERIENCES);
        } catch (err) {
            setError(err.message);
        }


    }

    const clearErrorHandler = () => {
        setError(false);
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <div className={styles['interivew-detail-screen']}>
                <h3>INTERVIEW EXPERIENCE</h3>
                <Grid className={styles['grid']}>
                    <Card className={styles['company-card']}>
                        <h2>{interview.companyName}</h2>
                        <h4>{interview.year}</h4>
                    </Card>
                    <Card className={styles['author-card']}>
                        <h4>Author</h4>
                        <div className={styles['content']}>
                            <Avatar src={interview.user.photoURL} className={styles['avatar']} />
                            <div className={styles['details']}>
                                <h2>{interview.user.name}</h2>
                                <small>{getLocalDateFromFirebaseTimestamp(interview.createdAt)}</small>
                                <span>{interview.user.email}</span>
                                <span>{interview.user.registrationNum}</span>
                                <span>{interview.user.branch}</span>
                            </div>
                        </div>
                    </Card>
                    <Card className={styles['rounds-card']}>
                        <p className={styles['question']}>
                            How many rounds were there? Describe briefly.
                    </p>
                        <p className={styles['answer']}>{interview.roundsDescription}</p>
                    </Card>
                    <Card className={styles['questions-card']}>
                        <p className={styles['question']}>
                            What questions were asked? Describe briefly.
                    </p>
                        <p className={styles['answer']}>{interview.questionsDescription}</p>
                    </Card>
                    <Card className={styles['advice-card']}>
                        <p className={styles['question']}>
                            Any advice for future aspirants?
                    </p>
                        <p className={styles['answer']}>{interview.advice || `No specific advice`}</p>
                    </Card>
                    <Card className={styles['action-card']}>
                        {updating && (
                            <LoadingSpinner />
                        )}
                        {!updating && !interview.verified && (
                            <CustomButton onClick={approveInterview} className={styles['approve-btn']}>
                                APPROVE
                            </CustomButton>
                        )}
                        {!updating && (
                            <CustomButton onClick={rejectInterview} className={styles['reject-btn']}>
                                REJECT
                            </CustomButton>
                        )}
                    </Card>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default withRouter(InterviewDetailScreen);
