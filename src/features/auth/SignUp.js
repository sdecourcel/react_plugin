import * as React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import REGISTER_USER from 'graphql/mutations/signUpUser';
import Button from 'components/form/Button';
import Text from 'components/typo/Text';
import Title from 'components/typo/Title';
import Link from 'components/typo/Link';
import TextField from 'components/form/TextField';
import FeedbackMessage from 'components/form/FeedbackMessage';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function SignUp({ children }) {
  const history = useHistory();
  const [registerUser] = useMutation(REGISTER_USER);
  const { handleSubmit, register, errors, setError } = useForm();

  const onSubmit = React.useCallback(
    (data) => {
      const {
        phone,
        password,
        email,
        firstName,
        lastName,
        birthDate,
        postalCode,
      } = data;

      registerUser({
        variables: {
          input: {
            phone,
            password,
            email,
            firstName,
            lastName,
            birthDate,
            postalCode,
          },
        },
      })
        .then(async (resp) => {
          if (
            resp &&
            resp.data &&
            resp.data.registerUser &&
            resp.data.registerUser.errors &&
            resp.data.registerUser.errors.length
          ) {
            return Promise.reject(resp.data.registerUser.errors);
          }
          if (!(resp && resp.data && resp.data.registerUser)) {
            return Promise.reject([]);
          } else {
            history.push({
              pathname: '/phone-confirmation',
              state: { phone: phone },
            });
          }
        })
        .catch((errors) => {
          console.log('error', errors);
          if (errors.length) {
            setError('api', 'api', 'Une erreur est survenue');
          }
        });
    },
    [history, setError, registerUser],
  );

  return (
    <Content>
      <Title>Je m'inscris'</Title>
      <Text>
        L'inscription à Covoit'ici est gratuite et sans engagement. Elle vous
        permet d'utiliser nos lignes de covoiturage en France, comme conducteur
        ou en tant que passager.
      </Text>
      <Spacer />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexBetween>
          <TextField
            label="Prénom"
            type="text"
            id="firstName"
            name="firstName"
            forwardedRef={register({ required: true })}
            error={errors.firstName && errors.firstName.message}
            errorMessage={errors.firstName && errors.firstName.message}
          />
          <TextField
            label="Nom"
            type="text"
            id="lastName"
            name="lastName"
            forwardedRef={register({ required: true })}
            error={errors.lastName && errors.lastName.message}
            errorMessage={errors.lastName && errors.lastName.message}
          />
        </FlexBetween>
        <Spacer />
        <FlexBetween>
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            autoComplete="email-address"
            forwardedRef={register({
              required: 'Veuillez saisir une adresse mail',
              pattern: {
                value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                message: "L'adresse mail est invalide",
              },
            })}
            error={errors.email && errors.email.message}
            errorMessage={errors.email && errors.email.message}
          />
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
        </FlexBetween>
        <Spacer />
        <FlexBetween>
          <TextField
            label="Date de naissance"
            type="date"
            id="birthDate"
            name="birthDate"
            forwardedRef={register({ required: true })}
            error={errors.birthDate && errors.birthDate.message}
            errorMessage={errors.birthDate && errors.birthDate.message}
          />
          <TextField
            label="Code Postal"
            type="text"
            id="postalCode"
            name="postalCode"
            forwardedRef={register({ required: true })}
            error={errors.postalCode && errors.postalCode.message}
            errorMessage={errors.postalCode && errors.postalCode.message}
          />
        </FlexBetween>
        <Spacer />
        <Spacer />
        <FlexBetween>
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
        </FlexBetween>
        <Spacer />
        <Spacer />
        {errors.api && <FeedbackMessage>{errors.api.message}</FeedbackMessage>}
        <Spacer />
        <Text>
          En vous inscrivant vous validez les CGU de Covoit’ici et Mango Pay
          pour le paiement
        </Text>
        <FlexBetween>
          <Button type="submit">S'inscrire</Button>
          <Link href="/connexion" title="connexion">
            Se connecter >
          </Link>
        </FlexBetween>
        <Spacer />
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

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  height: 10px;
`;

export default SignUp;
