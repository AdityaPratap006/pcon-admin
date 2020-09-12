import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../../components/ScreenTitle';
import Grid from '../../../components/Grid';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../../navigation/routes';
import { eventsRef } from '../../../firebase/firebase.utils';
import EventCard from '../../../components/EventCard';

const EventsScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener = null;

        const fetchAlumniList = async () => {
            listener = eventsRef.on('value', listSnapshot => {

                const eventsData = [];

                listSnapshot.forEach(snapshot => {
                    eventsData.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                setEvents(eventsData);
                setLoading(false);
            });
        }

        fetchAlumniList();

        return () => {
            if (listener) {
                eventsRef.off('value', listener);
            }
        };
    }, []);

    const renderedCards = events.map(ev => {
        return (
            <EventCard
                key={ev.id}
                event={ev}
            />
        );
    });

    return (
        <div className={styles['events-screen']}>
            <ScreenTitle>EVENTS</ScreenTitle>
            {loading && (
                <LoadingSpinner />
            )}
            {!loading && (
                <Grid className={styles['grid']}>
                    {renderedCards}
                </Grid>
            )}
            <Link to={`${navigationRoutes.EVENTS}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default EventsScreen;
