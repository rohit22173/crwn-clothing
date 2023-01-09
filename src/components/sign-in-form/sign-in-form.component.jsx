import { useState } from 'react';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {ButtonsContainer, H2Container, SignInContainer} from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
             await signInAuthUserWithEmailAndPassword(email, password);
            // await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found': alert('User not found');
                    break;
                default: console.error('Encountered an error in Sign In', error);
            }
        }

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <H2Container>Already have an account?</H2Container>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" label="Email" required onChange={handleChange} name="email" value={email} />

                <FormInput type="password" label="Password" required onChange={handleChange} name="password" value={password} minLength="6" />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;