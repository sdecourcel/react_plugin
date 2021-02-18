import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { getUser } from 'graphql/queries/me';
import { useMutation } from '@apollo/react-hooks';
import UPDATE_USER from 'graphql/mutations/updateUser';
import Button from 'components/form/Button';
import TextField from 'components/form/TextField';
import Title from 'components/typo/Title';
import Link from 'components/typo/Link';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import FeedbackMessage from 'components/form/FeedbackMessage';

function EditIdentity({ children }) {
  const { loading, error, data } = useQuery(getUser);
  const history = useHistory();
  const [updateUser] = useMutation(UPDATE_USER);
  const { handleSubmit, register, errors, setError } = useForm({
    defaultValues: {
      firstName: data && data.me && data.me.firstName,
      lastName: data && data.me && data.me.lastName,
      birthDate: data && data.me && data.me.birthDate,
    },
  });

  const onSubmit = React.useCallback(
    (data) => {
      const { firstName, lastName, birthDate } = data;

      updateUser({
        variables: {
          input: {
            firstName,
            lastName,
            birthDate,
          },
        },
      })
        .then(async (resp) => {
          if (
            resp &&
            resp.data &&
            resp.data.updateUser &&
            resp.data.updateUser.errors &&
            resp.data.updateUser.errors.length
          ) {
            return Promise.reject(resp.data.updateUser.errors);
          }
          if (!(resp && resp.data && resp.data.updateUser)) {
            return Promise.reject([]);
          } else {
            history.push('/mon-compte');
          }
        })
        .catch((errors) => {
          console.log('error', errors);
          if (errors.length) {
            setError('api', 'api', 'Une erreur est survenue');
          }
        });
    },
    [history, setError, updateUser],
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Content>
      <Title>Informations personnelles</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          label="Date de naissance"
          type="date"
          id="birthDate"
          name="birthDate"
          forwardedRef={register({ required: true })}
          error={errors.birthDate && errors.birthDate.message}
          errorMessage={errors.birthDate && errors.birthDate.message}
        />
        <Spacer />
        <Button type="submit">Enregistrer</Button>
        <Spacer />
      </Form>
      <Spacer />
      <Link href="#" title="telecharger attestation parentale">
        Télécharger l'attestation parentale
      </Link>
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

export default EditIdentity;
