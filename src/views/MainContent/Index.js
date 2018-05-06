import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

// import Topic from './Topic'
import  Sidebar from './Sidebar/'

import PageLogin from './PageLogin'
import PageLogout from './PageLogout'

class MainContent extends Component {



renderIn(){

	if(localStorage.getItem('nordic') === null ){


		return(

               <PageLogout />

			)


	}else{


     return(

       <PageLogin />

     	)

	}



}




  render() {
   
   
    return (
      
	     <div className="candy-wrapper">
	        <div className="main">
	          <div className="row inner">
	         

	          {this.renderIn()}

              {/* end for row */}

	          </div>
	         </div>
	         <Sidebar />
	      </div>


    )
  }
}




export default MainContent;
