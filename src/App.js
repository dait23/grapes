import React, { Component } from 'react';
//import { Router, browserHistory, Route, Link } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Container} from 'reactstrap';


import Header from './components/Header/';
import Footer from './components/Footer/';


import Loading from './Loading';
import Loadable from 'react-loadable';
import fakeDelay from './fakeDelay';




const Home = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Home/')),
  loading: Loading,
  timeout: 10000, // 10 seconds
 // serverSideRequirePath: path.resolve(__dirname, './Feed')
});


const About = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/About/')),
  loading: Loading,
  timeout: 10000, // 10 seconds
 // serverSideRequirePath: path.resolve(__dirname, './Feed')
});



class App extends Component {
  render() {
    return (
        <div>
          <main>
            <Header />
              <Container>
                 <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                  </Switch>
              </BrowserRouter>
              </Container>
            <Footer />
           </main>
        </div>
    );
  }
}
export default App;