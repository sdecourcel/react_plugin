import * as React from 'react';
import styled from 'styled-components';
// import { useContext } from 'react';
// import { ThemeContext } from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import CONFIRM_PHONE_NUMBER from 'graphql/mutations/confirmPhoneNumber';
// import RESEND_PHONE_CONFIRMATION from 'graphql/mutations/resendPhoneConfirmation';
import Button from 'components/form/Button';
import FeedbackMessage from 'components/form/FeedbackMessage';
import Title from 'components/typo/Title';
import Link from 'components/typo/Link';
import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function PhoneConfirmation({ children }) {
  // const themeContext = useContext(ThemeContext);
  const history = useHistory();
  const [confirmPhoneNumber] = useMutation(CONFIRM_PHONE_NUMBER);
  const { handleSubmit, register, errors, setError } = useForm();

  const [phoneConfirmationCode, setPhoneConfirmationCode] = React.useState('');

  const onSubmit = React.useCallback(
    (data) => {
      const phone = history.location.state.phone;

      confirmPhoneNumber({
        variables: { input: { phone, phoneConfirmationCode } },
      })
        .then(async (resp) => {
          if (
            resp &&
            resp.data &&
            resp.data.confirmPhoneNumber &&
            resp.data.confirmPhoneNumber.errors &&
            resp.data.confirmPhoneNumber.errors.length
          ) {
            return Promise.reject(resp.data.confirmPhoneNumber.errors);
          }
          if (!(resp && resp.data && resp.data.confirmPhoneNumber)) {
            return Promise.reject([]);
          } else {
            return resp.data.confirmPhoneNumber;
          }
        })
        .then(() => {
          if (window.ECOV_AFTER_SIGNUP_URL) {
            window.location = window.ECOV_AFTER_SIGNUP_URL;
          } else {
            window.location = '/';
          }
        })
        .catch((errors) => {
          console.log('error', errors);
          if (errors.length) {
            setError('api', 'api', 'Une erreur est survenue');
          }
        });
    },
    [
      history.location.state.phone,
      confirmPhoneNumber,
      phoneConfirmationCode,
      setError,
    ],
  );

  const otpContainerStyle = {
    justifyContent: 'center',
  };

  const otpInputStyle = {
    width: '40px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderRadius: '6px',
    margin: '0 10px',
    // borderColor: ${(p) =>
    //   p.hasError ? p.theme.colors.error : p.theme.colors.primary},
    // backgroundColor: ${themeContext.theme.colors.appBackground},
    // margin: 0 ${(p) => p.theme.gutter / 2}px,
  };

  return (
    <Content>
      <Title>Code de vérification du numéro de telephone</Title>
      <Spacer />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Spacer />
        <OtpInput
          ref={register({ required: true })}
          value={phoneConfirmationCode}
          onChange={setPhoneConfirmationCode}
          numInputs={4}
          inputStyle={otpInputStyle}
          containerStyle={otpContainerStyle}
        />
        <Spacer />
        {errors.api && <FeedbackMessage>{errors.api.message}</FeedbackMessage>}
        <Spacer />
        <Button type="submit">Envoyer</Button>
        <Spacer />
        <Link href="#" title="renvoyer un code de confirmation">
          Renvoyer un code de confirmation
        </Link>
      </Form>
    </Content>
  );
}

const Content = styled.div`
  text-align: center;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 60%;
`;

const Spacer = styled.div`
  height: 10px;
`;

export default PhoneConfirmation;
