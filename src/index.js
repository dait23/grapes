import React from 'react'
import { render } from 'react-snapshot';


import { BrowserRouter, Switch, Route, browserHistory } from 'react-router-dom'
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

const Draft = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Story/Draft')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const EditDraft = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Story/Edit')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Publish= Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Story/Publish')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Setting= Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Setting/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Publication= Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Publishing= Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publishing')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});



const Interest= Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Interest/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const NewPublish = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/New')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const StoryPublish = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Story/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});



const EditPublish = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Edit')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const StatPublish = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Stats/')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const StatDraft = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Stats/Draft')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


const StatWritter = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Stats/Writter')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const StoryDraft = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Publication/Stats/Edit')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});

const Login = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Login')),
  loading: Loading,
  timeout: 10000, // 10 seconds

});


const Welcome = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/MainContent/Welcome')),
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
     <BrowserRouter>
       <div>
     
          <main>
            <Header />
            <Switch>
             <Route exact path='/' component={Home} />
             <Route path="/@:username/:slug" component={Single} />
             <Route path="/@:username" component={Profile} />
             <Route path="/topic/:slug" component={Topic} />
             <Route path="/publishing/:slug" component={Publishing} />
             <Route path='/login' component={Login} />
             <Route path='/welcome' component={Welcome} />
             <Route path="/me/stories/drafts" component={Draft} />
             <Route path="/me/stories/draft/edit/:id" component={EditDraft} />
             <Route path="/me/stories/publish" component={Publish} />
             <Route path="/me/topics/interest" component={Interest} />
             <Route path="/me/publications" component={Publication} />
             <Route path="/me/publication/edit/:id" component={EditPublish} />
             <Route path="/me/publication/stats-publish/:id" component={StatPublish} />
             <Route path="/me/publication/stats-draft/:id" component={StatDraft} />
              <Route path="/me/publication/stats-writter/:id" component={StatWritter} />
             <Route path="/me/publication/new-story/:id" component={StoryPublish} />
             <Route path="/me/publication/draft-story/edit/:id" component={StoryDraft} />
             <Route path="/me/list/bookmarks" component={Login} />
             <Route path="/me/settings" component={Setting} />
             <Route path="/404" component={NotFound} />
             <Route path='/new-story' component={NewStory} />
             <Route path='/new-publication' component={NewPublish} />
            <Route path="*" component={NotFound} />        
          </Switch>
      </main>

      </div>
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
