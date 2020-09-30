import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import Card from '../Card';
import CustomButton from '../CustomButton';
import { projectsRef } from '../../firebase/firebase.utils';
import ErrorModal from '../ErrorModal';
import { MdDelete } from 'react-icons/md';

const ProjectCard = ({ project }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const projectId = project.id;
    const deleteEvent = useCallback(async () => {
        setLoading(true);

        try {
            const projectItemRef = projectsRef.child(projectId);
            await projectItemRef.remove();
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }, [projectId]);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />
            <Card key={project.id} className={styles['project-card']}>
                {!loading && (
                    <MdDelete
                        className={styles['delete-btn']}
                        onClick={deleteEvent}
                    />
                )}
                <h3 className={styles['title']}>{project.title}</h3>
                <h5>Tech Stack / Domain</h5>
                <p className={styles['content']}>{project.techStack}</p>
                <a target="_blank" rel="noopener noreferrer" href={project.link}>
                    <CustomButton>VIEW PROJECT</CustomButton>
                </a>
            </Card>
        </React.Fragment>
    );
};

export default ProjectCard;
