import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '..//Api/';
// import Topic from './Topic'
import  Sidebar from './Sidebar/'

import PageLogin from './PageLogin'
import PageLogout from './PageLogout'
import PageTopic from './PageTopic'

const Uid = window.localStorage.getItem('uid');


class MainContent extends Component {

constructor(props) {
    super(props)
    this.state = { 

    isInterested:'',
    data:{},
    loading: true
    }

}




renderIn(){

    if (this.state.loading) {

            return(
                 <div></div>
              )

     }


   

	if(localStorage.getItem('nordic') == null && localStorage.getItem('uid') == null ){


		return(

               <PageLogout />

			)


	}

	else{


     return(

       <PageLogin />

     	)

	}



}



renderMain(){

 if(localStorage.getItem('uid') == null){

     


 }



}




  render() {
   

   	if (this.state.loading) {

            return(
                 <div></div>
            	)

		 }
   
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
