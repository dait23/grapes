import React from 'react'
import { render } from 'react-snapshot';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink} from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Loadable from 'react-loadable'

import helpStore from './views/Store/Store';


///////////////// Api

import {MainApi} from './views/Api/'

/////////////////////// Header + Footer

import Header from './components/Header/'
//import Footer from './components/Footer/'


/////////////////////// Code Splitting

import Loading from './components/Loading'
import fakeDelay from './fakeDelay'



////////////// View Component 

const Home = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Home/')),
  loading: Loading,
  timeout: 10000, // 10 second
});


const Single = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Single/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Profile = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Profile/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


const Topic = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Topic/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


const NewStory = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Story')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


// const Privacy = Loadable({
//  loader: () => fakeDelay(500).then(() => import('./views/Privacy/')),
//   loading: Loading,
//   timeout: 10000, // 10 seconds

// });

// const Terms = Loadable({
//  loader: () => fakeDelay(1500).then(() => import('./views/Terms/')),
//   loading: Loading,
//   timeout: 10000, // 10 seconds

// });

const NotFound = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/404/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


const httpLink = createHttpLink({ uri: MainApi })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('nordic')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

render(
  <ApolloProvider client={client}>
    <Router>
       <div>
     
          <main>
            <Header />
            <Switch>
             <Route exact path='/' component={Home} />
             <Route exact path='/single' component={Single} />
             <Route exact path='/@profile' component={Profile} />
             <Route exact path='/topic' component={Topic} />
             <Route exact path='/new-story' component={NewStory} />
            <Route path='*' component={NotFound} />        
          </Switch>
      </main>

      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
