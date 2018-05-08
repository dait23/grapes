import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './RList';



class Response extends Component {

static propTypes = {
  id: PropTypes.string
};



renderComment(){
 const commentList = this.props.data.allComments || [ ]

  if(this.props.data.allComments == ''){

    return(
         
           <div className="row" style={{marginBottom:'0px', marginTop:'10px'}}>

           <div className="col-md-1"></div>


           <div className="col-md-10"><p style={{fontSize:'14px'}}>No responses for this storie...</p></div>

           <div className="col-md-1"></div>


           </div>

      )
  }else{

 
                return(

                  <div>

                        {commentList.map((comment) => (
                          <List
                      key={comment.id}
                      comment={comment}
                    />
                ))}

                  </div>


                )
  }



}


  render() {

    

    if (this.props.data.loading) {

     return (<div></div>)
    }


    return (
     

          <div>

             {this.renderComment()}

                 </div>

    )
  }
}



const commentQuery = gql`query allComments($id: ID!) {
   allComments(filter:{
    post:{
      id: $id
    }
  }, orderBy: updatedAt_DESC, last: 10) {
        id
        text
        createdAt
        updatedAt
        user{
          id
          username
          facebookUserId
          avatar
          member{
            firstName
            lastName
            imageId
            imageUrl
          }
        }
     }
   
}`



export default graphql(commentQuery, {
  options: (props) => ({ variables: { id: props.id } })
})( Response );