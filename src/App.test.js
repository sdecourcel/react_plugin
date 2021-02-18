import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { Colors, Theme } from 'assets/style/Theme';
import App from './App';

const mocks = [];
const theme = {
  ...Theme,
  colors: {
    ...Colors,
  },
};

test('renders sign in component', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Router>
          <App component="sign-in" />
        </Router>
      </ThemeProvider>
    </MockedProvider>,
  );
  const titleElement = await screen.findByText(/Je me connecte/i);
  expect(titleElement).toBeInTheDocument();
});
