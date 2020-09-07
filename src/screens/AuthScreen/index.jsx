import React, { useState } from 'react';
import styles from './index.module.scss';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_MINLENGTH } from '../../utils/validators';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    const { formState, inputHandler } = useForm(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const { codeword } = formState.inputs;

        setLoading(true);
        await new Promise(resolve => setTimeout(() => {
            console.log(codeword);
            resolve();
        }, 3000));
        setLoading(false);
    }

    return (
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
    );
};

export default AuthScreen;
