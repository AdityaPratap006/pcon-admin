import React, { useState } from 'react';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import ScreenTitle from '../../components/ScreenTitle';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from '../../utils/validators';
import LoadingSpinner from '../../components/LoadingSpinner';
import { navigationRoutes } from '../../navigation/routes';
import ErrorModal from '../../components/ErrorModal';
import { getYearList, monthListWithNull } from '../../utils/dateList';

const yearList = getYearList(2014);

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
        location: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const CreateAchievementScreen = () => {
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
        history.push(navigationRoutes.ACHIEVEMENTS);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
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
            <div className={styles['create-achievement-screen']}>
                <ScreenTitle>
                    CREATE ACHIEVEMENT
            </ScreenTitle>
                <Card className={styles['form-card']}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={styles['create-achievement-form']}
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
                            element="select"
                            id="year"
                            label="Year"
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
                            label="Month (OPTIONAL)"
                            validators={[]}
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
}

export default CreateAchievementScreen;
