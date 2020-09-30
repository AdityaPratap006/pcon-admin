import React, { useState } from 'react';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../hooks/form-hook';
import { navigationRoutes } from '../../../navigation/routes';
import ScreenTitle from '../../../components/ScreenTitle';
import Card from '../../../components/Card';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorModal from '../../../components/ErrorModal';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_URL } from '../../../utils/validators';
import { projectsRef } from '../../../firebase/firebase.utils';

const INITIAL_FORM_STATE = {
    inputs: {
        title: {
            value: "",
            isValid: false,
        },
        techStack: {
            value: "",
            isValid: false,
        },
        
        link: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const CreateProjectScreen = () => {
    const { formState, inputHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const clearErrorHandler = () => {
        setError('');
    }

    const clearSuccessHandler = () => {
        setSuccess('');
        history.push(navigationRoutes.PROJECTS);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            title,
            techStack,
            link,
        } = formState.inputs;

        const projectData = {
            title: title.value,
            techStack: techStack.value,
            link: link.value,
        };

        try {
            const projectItemRef = await projectsRef.push();
            projectItemRef.set({
                ...projectData,
            })

            setSuccess('Project created!');
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }


    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <ErrorModal
                success
                error={success}
                onClear={clearSuccessHandler}
            />
            <div className={styles['create-project-screen']}>
                <ScreenTitle>
                    CREATE PROJECT
                </ScreenTitle>
                <Card className={styles['form-card']}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles['create-project-form']}
                    >
                        <CustomInput
                            id="title"
                            type="text"
                            label="Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            id="link"
                            type="text"
                            label="Link (URL of Github repo, Hackerearth Challenge etc)"
                            validators={[VALIDATOR_URL()]}
                            errorText={"Invalid URL"}
                            getInput={inputHandler}
                            initialValue={''}
                        />
                        <CustomInput
                            element="textarea"
                            rows={3}
                            id="techStack"
                            label="Tech Stack / Domain"
                            validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(300)]}
                            errorText={"Should be atleast 1 character and atmost 300 characters"}
                            getInput={inputHandler}
                        />
                        {!loading && (
                            <CustomButton type="submit" disabled={!formState.isValid}>
                                CREATE
                            </CustomButton>
                        )}
                        {loading && <LoadingSpinner />}
                    </form>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default CreateProjectScreen;
