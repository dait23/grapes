import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

// import Topic from './Topic'
import  Sidebar from './Sidebar/'

import PageLogin from './PageLogin'
import PageLogout from './PageLogout'
import PageTopic from './PageTopic'

class MainContent extends Component {

constructor(props) {
    super(props)
    this.state = { 
    isInterested:''
    }

}



renderIn(){

	if(localStorage.getItem('nordic') === null ){


		return(

               <PageLogout />

			)


	}

	if(this.props.data.User.isInterested == false){

     return(

            <PageTopic />
     	)
	}
	else{


     return(

       <PageLogin />

     	)

	}



}




  render() {
   

   	if (this.props.data.loading) {

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




const Uid = window.localStorage.getItem('uid');
const QueryUserx = gql`query Userx($id: ID!) {

   User(id: $id){
    id
    isInterested
  }

}`

const ListPageWithData = graphql(QueryUserx, {
  options: { variables: { id: Uid } }
})(MainContent)

export default ListPageWithData
