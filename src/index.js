import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProviders } from './AppProviders';

[...document.querySelectorAll('[data-component]')].forEach((container) => {
  const component = container.attributes['data-component'].value;

  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App component={component} />
      </AppProviders>
    </React.StrictMode>,
    container,
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
