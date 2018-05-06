import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Topic from './Topic'
import  Sidebar from './Sidebar'

class MainContent extends Component {


  render() {
   
   
    return (
      
	     <div className="candy-wrapper">
	        <div className="main">
	          <div className="row inner">
	         

	          <Topic 
               title="Creativity"
	          />

	          <Topic 
               title="Entrepreneurship"
	          />


              {/* end for row */}

	          </div>
	         </div>
	         <Sidebar />
	      </div>


    )
  }
}




export default MainContent;
