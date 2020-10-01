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
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../../utils/validators';
import { notificationsRef } from '../../../firebase/firebase.utils';

const INITIAL_FORM_STATE = {
    inputs: {
        title: {
            value: "",
            isValid: false,
        },
        content: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const CreateNotificationScreen = () => {
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
        history.push(navigationRoutes.NOTIFICATIONS);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            title,
            content,
        } = formState.inputs;

        const notificationData = {
            title: title.value,
            content: content.value,
            createdAt: new Date(Date.now()).toString(),
        };

        try {
            const notificationItemRef = await notificationsRef.push();
            notificationItemRef.set({
                ...notificationData,
            })

            setSuccess('Notification created!');
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
            <div className={styles['create-notification-screen']}>
                <ScreenTitle>
                    CREATE NOTIFICATION
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
                            element="textarea"
                            rows={3}
                            id="content"
                            label="Content"
                            validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(100)]}
                            errorText={"Should be atleast 10 characters and atmost 100 characters"}
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

export default CreateNotificationScreen;
