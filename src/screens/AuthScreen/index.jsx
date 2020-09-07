import React, { useState, useContext } from 'react';
import styles from './index.module.scss';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_MINLENGTH } from '../../utils/validators';
import { AuthContext } from '../../contexts/auth-context';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';

const INITIAL_FORM_STATE = {
    inputs: {
        codeword: {
            value: "",
            isValid: false,
        },
    },
    isValid: false,
};

const AuthScreen = () => {
    const auth = useContext(AuthContext);
    const { formState, inputHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [responseError, setResponseError] = useState('');

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        setLoading(true);
        const { codeword } = formState.inputs;

        if (codeword.value === process.env.REACT_APP_CODEWORD) {
            auth.login();
        } else {
            setResponseError('Wrong Credentials!');
        }
        setLoading(false);
    }

    const clearErrorHandler = () => {
        setResponseError('');
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearErrorHandler}
            />
            <div className={styles['auth-screen']}>
                <Card className={styles['card']}>
                    <h2>Ruko Zara!! </h2>
                    <form onSubmit={formSubmitHandler} className={styles['auth-form']}>
                        <CustomInput
                            id="codeword"
                            type="text"
                            label="Pehle Code Word Batao!"
                            validators={[VALIDATOR_MINLENGTH(4)]}
                            errorText={"Code Word is atleast 4 characters long"}
                            getInput={inputHandler}
                        />
                        {!loading && (
                            <CustomButton type="submit" disabled={!formState.isValid}>
                                SUBMIT
                            </CustomButton>
                        )}
                        {loading && <LoadingSpinner />}
                    </form>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default AuthScreen;
