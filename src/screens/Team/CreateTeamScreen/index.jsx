import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import ScreenTitle from '../../../components/ScreenTitle';
import Card from '../../../components/Card';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_URL } from '../../../utils/validators';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { navigationRoutes } from '../../../navigation/routes';
import ErrorModal from '../../../components/ErrorModal';
import Avatar from '../../../components/Avatar';
import { teamRef } from '../../../firebase/firebase.utils';

const INITIAL_FORM_STATE = {
    inputs: {
        name: {
            value: "",
            isValid: false,
        },
        role: {
            value: "",
            isValid: false,
        },
        type: {
            value: "",
            isValid: false,
        },
        linkedinURL: {
            value: "",
            isValid: false,
        },
        githubURL: {
            value: "",
            isValid: false,
        },
        facultyURL: {
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

const roleList = [
    {
        key: 'member',
        value: 'Member',
    },
    {
        key: 'pres',
        value: 'President',
    },
    {
        key: 'gen_sec',
        value: 'General Secretary',
    },
    {
        key: 'tech_sec',
        value: 'Technical Secretary',
    },
    {
        key: 'tres',
        value: 'Treasurer',
    },
    {
        key: 'faculty',
        value: 'Faculty',
    },
];

const typeList = [
    {
        key: 'final',
        value: 'Final Year',
    },
    {
        key: 'pre-final',
        value: 'Pre-Final Year',
    }
];

const CreateTeamScreen = () => {
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
        history.push(navigationRoutes.TEAM);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            name,
            role,
            type,
            linkedinURL,
            facultyURL,
            githubURL,
            photoURL,
        } = formState.inputs;

        const memberData = {
            name: name.value,
            role: role.value,
            type: type.value,
            linkedinURL: linkedinURL.value,
            facultyURL: facultyURL.value,
            githubURL: githubURL.value,
            photoURL: photoURL.value,
        };

        try {
            const teamMemberRef = await teamRef.push();
            teamMemberRef.set({
                ...memberData,
            })
            setSuccess('Team Member created!');
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    }


    const { role } = formState.inputs;
    useEffect(() => {
        // console.log(role.value);
        if (role.value === 'Faculty') {
            inputHandler('linkedinURL', '', true);
            inputHandler('githubURL', '', true);
            inputHandler('type', 'Faculty', true);
        } else {
            inputHandler('facultyURL', '', true);
        }
    }, [role, inputHandler]);

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                onClear={clearErrorHandler}
            />
            <ErrorModal
                error={success}
                onClear={clearSuccessHandler}
                success
            />
            <div className={styles['create-team-screen']}>
                <ScreenTitle>CREATE TEAM MEMBER</ScreenTitle>
                <Card className={styles['form-card']}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles['create-alumni-form']}
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
                            id="role"
                            label="Role"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={roleList}
                            initialValue={roleList[0].value}
                            initialValidity={true}
                        />
                        {role.value !== 'Faculty' && (<CustomInput
                            element="select"
                            id="type"
                            label="Type"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={typeList}
                            initialValue={typeList[0].value}
                            initialValidity={true}
                        />)}
                        {role.value === 'Faculty' && (<CustomInput
                            id="facultyURL"
                            type="text"
                            label="Faculty Profile URL"
                            validators={[VALIDATOR_URL()]}
                            errorText={"Invalid URL"}
                            getInput={inputHandler}
                        // initialValidity={formState.inputs.role.value !== 'Faculty' ? true : formState.inputs.facultyURL.isValid}
                        />)}
                        {role.value !== 'Faculty' && (<CustomInput
                            id="linkedinURL"
                            type="text"
                            label="LinkedIn Profile URL"
                            validators={[VALIDATOR_URL()]}
                            errorText={"Invalid URL"}
                            getInput={inputHandler}
                        // initialValidity={}
                        />)}
                        {role.value !== 'Faculty' && (<CustomInput
                            id="githubURL"
                            type="text"
                            label="Github Profile URL"
                            validators={[VALIDATOR_URL()]}
                            errorText={"Invalid URL"}
                            getInput={inputHandler}
                        // initialValidity={formState.inputs.role.value === 'Faculty' ? true : formState.inputs.githubURL.isValid}
                        />)}
                        <CustomInput
                            id="photoURL"
                            type="text"
                            label="Profile Picture URL"
                            validators={[VALIDATOR_URL()]}
                            errorText={"Invalid URL"}
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

export default CreateTeamScreen;
