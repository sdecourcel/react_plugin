import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import SIGN_IN_USER from 'graphql/mutations/signInUser';
import Button from 'components/form/Button';
import Text from 'components/typo/Text';
import Title from 'components/typo/Title';
import Link from 'components/typo/Link';
import TextField from 'components/form/TextField';
import FeedbackMessage from 'components/form/FeedbackMessage';
import { useAuth } from './Auth.context';
import { useForm } from 'react-hook-form';

function SignIn({ children }) {
  const [signInUser] = useMutation(SIGN_IN_USER);
  const { login } = useAuth();
  const { handleSubmit, register, errors, setError } = useForm();

  const onSubmit = React.useCallback(
    (data) => {
      const { phone, password } = data;

      signInUser({ variables: { input: { phone, password } } })
        .then(async (resp) => {
          if (
            resp &&
            resp.data &&
            resp.data.signInUser &&
            resp.data.signInUser.errors &&
            resp.data.signInUser.errors.length
          ) {
            return Promise.reject(resp.data.signInUser.errors);
          }
          if (
            !(
              resp &&
              resp.data &&
              resp.data.signInUser &&
              resp.data.signInUser.token
            )
          ) {
            return Promise.reject([]);
          } else {
            login(resp.data.signInUser.token);
          }
        })
        .then(() => {
          if (window.ECOV_AFTER_SIGNIN_URL) {
            window.location = window.ECOV_AFTER_SIGNIN_URL;
          } else {
            window.location = '/mon-compte';
          }
        })
        .catch((errors) => {
          console.log('error', errors);
          if (errors.length) {
            errors.forEach((error) => {
              if (error.code === 'invalid_credentials') {
                setError('api', 'api', error.message);
              } else if (error.code === 'phone_not_confirmed') {
                return (
                  <Redirect
                    to={{
                      pathname: '/phone-confirmation',
                      state: { phone: phone },
                    }}
                  />
                );
              }
            });
          } else {
            setError('api', 'api', 'Une erreur est survenue');
          }
        });
    },
    [login, setError, signInUser],
  );

  return (
    <Content>
      <Title>Je me connecte</Title>
      <Text>
        Vous n'avez pas encore de compte ?
        <Link href="/inscription" title="inscription">
          S'inscrire >
        </Link>
      </Text>
      <Spacer />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Mobile"
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel-national"
          forwardedRef={register({
            required: 'Veuillez saisir un numéro de téléphone',
            pattern: {
              value: /^[0-9]{10}$/i,
              message: 'Le numéro de téléphone est invalide',
            },
          })}
          error={errors.phone && errors.phone.message}
          errorMessage={errors.phone && errors.phone.message}
        />
        <Spacer />
        <Spacer />
        <TextField
          label="Mot de passe"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          forwardedRef={register({ required: true })}
          error={errors.password && errors.password.message}
          errorMessage={errors.password && errors.password.message}
        />
        <Spacer />
        <Spacer />
        {errors.api && <FeedbackMessage>{errors.api.message}</FeedbackMessage>}
        <Spacer />
        <Button type="submit">Se connecter</Button>
        <Spacer />
        <Link href="#" title="aide à la connexion">
          Problème de connexion ?
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

export default SignIn;
