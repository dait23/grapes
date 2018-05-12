import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import List from './BList';

class Bookmark extends Component {


  render() {

  	const inList = this.props.data.allBookmarks || []

  	 if (this.props.data.loading) {
      return (<div></div>)

   }
   
   
    return (
      
	      <div>
     
           <div className="header-block"><h3 className="title">Reading List</h3></div>

           <div className="trend-postsx">

            <ol className="popular-list">
                     {inList.map((book) => (
                    <List
                      key={book.id}
                      book={book}
                      refresh={() => this.props.data.refetch()}
                    />
                  ))}
           </ol>

           </div>

         </div>

    )
  }
}

const Uid = window.localStorage.getItem('uid');

const QueryBook = gql`query allBookmark ($id: ID!) {
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





const ListPageWithData = graphql(QueryBook, {
  options: { variables: { id: Uid } }
})(Bookmark)

export default ListPageWithData
