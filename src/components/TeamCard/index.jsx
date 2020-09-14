import React, { useState } from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import Avatar from '../Avatar';
import { teamRef } from '../../firebase/firebase.utils';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import CustomButton from '../CustomButton';
import LoadingSpinner from '../LoadingSpinner';

const TeamCard = (props) => {
    const [updating, setUpdating] = useState(false);

    const { teamMember } = props;

    const deleteTeamMemberHandler = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await teamRef.child(teamMember.id).remove();
        } catch (err) {
            setUpdating(false);
        }

    }

    const {
        name,
        role,
        linkedinURL,
        githubURL,
        facultyURL,
        photoURL,
    } = teamMember;
    return (
        <div className={styles['team-item']}>
            <Card className={styles['team-card']}>
                <Avatar src={photoURL} className={styles['avatar']} />
                <div className={styles['body']}>
                    <span className={styles['name']}>{name}</span>
                    <span className={styles['role']}>{`${role}`}</span>
                    <div className={styles['profile-links']}>
                        {linkedinURL && (
                            <a target="_blank" rel="noopener noreferrer" href={linkedinURL}>
                                <SiLinkedin className={styles['linkedin-icon']} />
                            </a>
                        )}
                        {githubURL && (
                            <a target="_blank" rel="noopener noreferrer" href={githubURL}>
                                <SiGithub className={styles['github-icon']} />
                            </a>
                        )}
                        {facultyURL && (
                            <a target="_blank" rel="noopener noreferrer" href={facultyURL}>
                                <CustomButton>VIEW PROFILE</CustomButton>
                            </a>
                        )}
                    </div>
                </div>
                <div className={styles['footer']}>
                    {!updating && (
                        <CustomButton onClick={deleteTeamMemberHandler} className={styles['approve-btn']}>
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

export default TeamCard;
