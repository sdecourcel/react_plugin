import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { getUser } from 'graphql/queries/me';
import Text from 'components/typo/Text';
import Title from 'components/typo/Title';
import SubTitle from 'components/typo/SubTitle';
import Link from 'components/typo/Link';
// import FeedbackMessage from 'components/form/FeedbackMessage';
import { Link as LinkRouter } from 'react-router-dom';

function Profile({ children }) {
  const { loading, error, data } = useQuery(getUser);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Content>
      <Title>Mon profil</Title>
      <Link href="#" title="modifier">
        Modifier >
      </Link>
      <FlexBetween>
        <Content>
          <FlexBetween>
            <SubTitle>Informations personnelles</SubTitle>
            <HorizontalSpacer />
            <LinkRouter to="/mon-compte/modifier-identite">
              <SubTitle>></SubTitle>
            </LinkRouter>
          </FlexBetween>
          <Text>
            {data.me.firstName} {data.me.lastName}
          </Text>
          <Text>{data.me.birthDate}</Text>
          <Spacer />
          <Spacer />
          <SubTitle>Coordonnées</SubTitle>
          <Text>{data.me.email}</Text>
          <Text>{data.me.phone}</Text>
          <Text>{data.me.address}</Text>
          <Text>
            {data.me.city}
            {data.me.postalCode}
          </Text>
        </Content>
        <Content>
          <SubTitle>Coordonnées bancaires</SubTitle>
          <Text>
            Vos informations de paiement et vos transactions sont conservées sur
            un serveur sécurisé.
          </Text>
          <Spacer />
          <SubTitle>IBAN</SubTitle>
          <Spacer />
          <Spacer />
          <SubTitle>Carte Bancaire</SubTitle>
          <Spacer />
          <Spacer />
          <SubTitle>Code conducteur</SubTitle>
          <Spacer />
          <Text>{data.me.shareCode}</Text>
        </Content>
      </FlexBetween>

      <Spacer />
    </Content>
  );
}

const Content = styled.div`
  text-align: center;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HorizontalSpacer = styled.div`
  width: 10px;
`;

const Spacer = styled.div`
  height: 10px;
`;
export default Profile;
