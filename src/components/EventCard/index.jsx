import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import CustomButton from '../CustomButton';
import { eventsRef } from '../../firebase/firebase.utils';
import ErrorModal from '../ErrorModal';
import { MdDelete } from 'react-icons/md';

const EventCard = ({ event }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const eventId = event.id;
    const deleteEvent = useCallback(async () => {
        setLoading(true);

        try {
            const eventItemRef = eventsRef.child(eventId);
            await eventItemRef.remove();
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }, [eventId]);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />
            <Card key={event.id} className={styles['event-card']}>
                {!loading && (
                    <MdDelete
                        className={styles['delete-btn']}
                        onClick={deleteEvent}
                    />
                )}
                <h3 className={styles['title']}>{event.title}</h3>
                <div className={styles['info']}>
                    <span className={styles['date']}>{event.month} {event.year}</span>
                </div>
                <p className={styles['content']}>{event.content}</p>
                <a target="_blank" rel="noopener noreferrer" href={event.link}>
                    <CustomButton>VIEW MORE</CustomButton>
                </a>
            </Card>
        </React.Fragment>
    );
};

export default EventCard;
