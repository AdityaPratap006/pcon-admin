import React, { useState } from 'react';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import { navigationRoutes } from '../../navigation/routes';
import ScreenTitle from '../../components/ScreenTitle';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_URL } from '../../utils/validators';
import { monthListWithNull, getYearList } from '../../utils/dateList';
import { eventsRef } from '../../firebase/firebase.utils';

const yearList = getYearList();

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
        month: {
            value: "",
            isValid: false,
        },
        year: {
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

const CreateEventScreen = () => {
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
        history.push(navigationRoutes.EVENTS);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const {
            title,
            content,
            month,
            year,
            link,
        } = formState.inputs;

        const eventData = {
            title: title.value,
            content: content.value,
            month: month.value,
            year: year.value,
            link: link.value,
        };

        try {
            const eventItemRef = await eventsRef.push();
            eventItemRef.set({
                ...eventData,
            })

            setSuccess('Event created!');
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
            <div className={styles['create-event-screen']}>
                <ScreenTitle>
                    CREATE EVENT
                </ScreenTitle>
                <Card className={styles['form-card']}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles['create-event-form']}
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
                            element="select"
                            id="year"
                            label="Year of Event"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={yearList}
                            initialValue={yearList[0].value}
                            initialValidity={true}
                        />
                        <CustomInput
                            element="select"
                            id="month"
                            label="Month of Event"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText={"Required"}
                            getInput={inputHandler}
                            optionList={monthListWithNull}
                            initialValue={monthListWithNull[0].value}
                            initialValidity={true}
                        />
                        <CustomInput
                            element="textarea"
                            rows={5}
                            id="content"
                            label="Content"
                            validators={[VALIDATOR_MINLENGTH(40), VALIDATOR_MAXLENGTH(600)]}
                            errorText={"Should be atleast 40 characters and atmost 600 characters"}
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

export default CreateEventScreen;
