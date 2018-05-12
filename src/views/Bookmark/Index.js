import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dlist from './Dlist'

import NotFound from'../../views/404/'


class Bookmarks extends Component {

renderList(){
 const inListx = this.props.data.allBookmarks || []
  
  if(this.props.data.allBookmarks == ''){

   
    return(
         
         <div>
         <p>No Bookmark Yet !!!</p>
         <br />
               </div>

      )

  }else{
      
      return(

          
          <div>
               {inListx.map((book) => (
                    <Dlist
                      key={book.id}
                      book={book}
                      refresh={() => this.props.data.refetch()}
                    />
                  ))}

          </div>


        )

  }


}


  render() {

    if(localStorage.getItem('nordic') == null ){


    return(

               <NotFound />

      )


  }

    if (this.props.data.loading) {
      return ( 
           
           <div>
            <div className="candy-wrapper">
          <div className="main">
            <div className="row inner" style={{paddingTop:'100px'}}>

            <div className="col-md-3"></div>
              

            <div className="col-md-9">
                <div className="main-title">
                  <h4><strong>My Bookmark</strong> Storie</h4>

                </div>

                <div className="col-xs-12">
                    
                     Loading....

                </div>
            </div>

           

              {/* end for row */}

            </div>
           </div>
    
        </div>
            </div>

            )
    }
    return (
      <div>
        

       <div className="candy-wrapper">
          <div className="main">
            <div className="row inner" style={{paddingTop:'100px'}}>

            <div className="col-md-3"></div>
              

            <div className="col-md-9">
                <div className="main-title">
                  <h4><strong>My Bookmark</strong> Stories </h4>
   
                </div>

                <div className="row">
                    <div className="col-xs-12">
                    
                    
                      {this.renderList()}
                </div>
                </div>

                
            </div>

           

              {/* end for row */}

            </div>
           </div>
    
        </div>

      </div>
    )
  }
}

const Uid = window.localStorage.getItem('uid');

const QueryBookx= gql`query allBookmark ($id: ID!) {
 allBookmarks(
    
    filter:{
      user:{
        id:$id
      }
    }, orderBy: createdAt_DESC
  ) {
        id
        post{
        id
        title
        slug
        headline
        reading
        createdAt
        imageId
        imageUrl
        user{
          username
          facebookUserId
          avatar
          member{
            firstName
            lastName
          }
        }
      }
            
        
     }

     
}`




const ListPageWithData = graphql(QueryBookx, {
  options: { variables: { id: Uid } }
})(Bookmarks)

export default ListPageWithData
