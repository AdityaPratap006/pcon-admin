import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../../components/ScreenTitle';
import Grid from '../../../components/Grid';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../../navigation/routes';
import { teamRef } from '../../../firebase/firebase.utils';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TeamCard from '../../../components/TeamCard';

const TeamScreen = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener;

        const fetchTeamMembers = async () => {
            listener = teamRef.on('value', listSnapshot => {
                const teamList = [];

                listSnapshot.forEach(snapshot => {
                    teamList.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                setTeamMembers(teamList);
                setLoading(false);
            });
        }

        fetchTeamMembers();

        return () => {
            if (listener) {
                teamRef.off('value', listener);
            }
        };
    }, []);

    const renderedFacultyMembers = teamMembers.filter(member => member.type === "Faculty").map(member => {
        return (
            <TeamCard key={member.id} teamMember={member} />
        );
    });

    const renderedFinalYearMembers = teamMembers.filter(member => member.type === "Final Year").map(member => {
        return (
            <TeamCard key={member.id} teamMember={member} />
        );
    });

    return (
        <div className={styles['team-screen']}>
            <ScreenTitle>TEAM</ScreenTitle>
            {loading && (
                <LoadingSpinner />
            )}
            {!loading && (
                <Grid>
                    {renderedFacultyMembers}
                </Grid>
            )}
            {!loading && (
                <>
                    <ScreenTitle>Final Year</ScreenTitle>
                    <Grid className={styles['grid']}>
                        {renderedFinalYearMembers}
                    </Grid>
                </>
            )}
            <Link to={`${navigationRoutes.TEAM}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default TeamScreen;
