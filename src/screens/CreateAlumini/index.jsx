import React, { useState } from 'react';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../utils/validators';
import LoadingSpinner from '../../components/LoadingSpinner';
import { navigationRoutes } from '../../navigation/routes';
import ErrorModal from '../../components/ErrorModal';
import Avatar from '../../components/Avatar';
import { yearList } from '../../utils/yearList';

const INITIAL_FORM_STATE = {
    inputs: {
        name: {
            value: "",
            isValid: false,
        },
        batch: {
            value: "",
            isValid: false,
        },
        company: {
            value: "",
            isValid: false,
        },
        linkedinURL: {
            value: "",
            isValid: false,
        },
        photoURL: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const CreateAluminiScreen = () => {
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
        history.push(navigationRoutes.ALUMINI);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            company,
            batch,
            name,
            linkedinURL,
            photoURL,
        } = formState.inputs;

        const aluminiData = {
            company: company.value,
            batch: batch.value,
            name: name.value,
            linkedinURL: linkedinURL.value,
            photoURL: photoURL.value,
        };


        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log(aluminiData);
            setSuccess('Alumini created!');
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
            <div className={styles['create-alumini-screen']}>
                <ScreenTitle>
                    CREATE ALUMINI
            </ScreenTitle>
                <Card className={styles['form-card']}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles['create-alumini-form']}
                    >
                        <CustomInput
                            id="name"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            element="select"
                            id="batch"
                            label="Year of Graduation"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={yearList}
                            initialValue={yearList[0].value}
                            initialValidity={true}
                        />
                        <CustomInput
                            id="company"
                            type="text"
                            label="Current Company"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            id="linkedinURL"
                            type="text"
                            label="LinkedIn URL"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        <CustomInput
                            id="photoURL"
                            type="text"
                            label="Profile Picture URL (from LinkedIn Profile)"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                        />
                        {
                            formState.inputs.photoURL.isValid
                                && formState.inputs.photoURL.value
                                ? (
                                    <Avatar
                                        src={formState.inputs.photoURL.value}
                                        className={styles['preview-avatar']}
                                    />
                                ) : (
                                    <div className={styles['preview-empty']}>
                                        PROFILE PIC PREVIEW
                                    </div>
                                )
                        }
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

export default CreateAluminiScreen;
