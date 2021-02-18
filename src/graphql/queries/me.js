import gql from 'graphql-tag';

const getUser = gql`
  query me {
    me {
      id
      uuid
      firstName
      lastName
      phone
      email
      birthDate
      address
      addresses {
        id
        address
        name
        lat
        lng
      }
      instantCommuteBlueprints {
        id
        name
        departureAddress {
          id
          address
          lat
          lng
          name
        }
        arrivalAddress {
          id
          address
          lat
          lng
          name
        }
        direction
        lineStations {
          id
          order
          station {
            id
            address
            lat
            lng
            name
            status
          }
        }
      }
      instantCommutes(limit: 5) {
        id
        startTimestamp
        endTimestamp
      }
      ridesAsPassenger(limit: 5, offset: 0) {
        id
        uuid
        state
        driver {
          id
          uuid
          firstName
          shareCode
        }
      }
      city
      postalCode
      wallets(pricingSystem: "monetary") {
        amount
        pricingSystem
        formatedAmount
      }
      bankAccounts {
        iban
        accountId
      }
      creditCards {
        id
        expirationDate
        number
        provider
      }
      shareCode
    }
  }
`;

export { getUser };
