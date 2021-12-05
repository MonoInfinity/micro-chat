import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './core/store';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import { config } from './core/config';

export const apolloClient = new ApolloClient({
      uri: `${config.SERVER_URL}/graphql`,
      credentials: 'include',
      cache: new InMemoryCache(),
});

ReactDOM.render(
      <React.StrictMode>
            <ApolloProvider client={apolloClient}>
                  <BrowserRouter>
                        <Provider store={store}>
                              <App />
                        </Provider>
                  </BrowserRouter>
            </ApolloProvider>
      </React.StrictMode>,
      document.getElementById('root')
);
