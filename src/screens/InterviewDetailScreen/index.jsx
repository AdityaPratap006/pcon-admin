import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'react-router-dom';
import { getInterviewDocument } from '../../firebase/firebase.utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const InterviewDetailScreen = (props) => {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={styles['interivew-detail-screen']}>
            <h1>{interview.companyName}</h1>
        </div>
    );
}

export default withRouter(InterviewDetailScreen);
