import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import ScreenTitle from '../../../components/ScreenTitle';
import Grid from '../../../components/Grid';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import { navigationRoutes } from '../../../navigation/routes';
import { projectsRef } from '../../../firebase/firebase.utils';
import ProjectCard from '../../../components/ProjectCard';

const ProjectsScreen = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let listener = null;

        const fetchProjectsList = async () => {
            listener = projectsRef.on('value', listSnapshot => {

                const projectsData = [];

                listSnapshot.forEach(snapshot => {
                    projectsData.push({
                        id: snapshot.key,
                        ...snapshot.val()
                    });
                });

                projectsData.sort((p1, p2) => {
                    if (p1.title < p2.title) {
                        return -1;
                    } else if (p1.title > p2.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                setProjects(projectsData);
                setLoading(false);
            });
        }

        fetchProjectsList();

        return () => {
            if (listener) {
                projectsRef.off('value', listener);
            }
        };
    }, []);

    const renderedCards = projects.map(project => {
        return (
           <ProjectCard key={project.id} project={project}/>
        );
    });

    return (
        <div className={styles['projects-screen']}>
            <ScreenTitle>PROJECTS</ScreenTitle>
            {loading && (
                <LoadingSpinner />
            )}
            {!loading && (
                <Grid className={styles['grid']}>
                    {renderedCards}
                </Grid>
            )}
            <Link to={`${navigationRoutes.PROJECTS}/create`} className={styles['add-btn']}>
                <FaPlus className={styles['icon']} />
            </Link>
        </div>
    );
};

export default ProjectsScreen;
