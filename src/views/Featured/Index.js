import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


import Left from './Left'
import Midle from './Midle'
import Right from './Right'


class Featured extends Component {


  render() {
   
   
    return (
      
     
           <div className="row">
          <div className="col-xs-12" style={{paddingTop:'70px'}}>
            <div className="main-title">
              <h4><strong>Featured</strong> Stories</h4>
            </div>
          </div>
          
        <Left />


          <div className="col-md-5 col-sm-6">
            
            <Midle />

          </div>

          <div className="col-md-3 hidden-sm visible-xs visible-lg visible-md">
              <Right />
          </div>

        </div>

    )
  }
}


export default Featured
