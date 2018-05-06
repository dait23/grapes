import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './List';

class Popular extends Component {

  //   constructor(props) {
  //   super(props)

  //   this.props = {
  
  //     allPosts:[]


  //    }
  // }



  render() {
   
   const popularList = this.props.data.allPosts || [ ]


   if (this.props.data.loading) {
      return (<div></div>)


       }
   
    return (
          
          <div>
     
           <div className="header-block-pop"><h3 className="title">Popular Stories</h3></div>
           <div className="trend-postsx">

            <ol className="popular-list">
             {this.props.data.allPosts.map((post) => (
            <List
              key={post.id}
              post={post}
              refresh={() => this.props.data.refetch()}
            />
          ))}
   </ol>

           </div>

         </div>
    )
  }
}




const QueryPopular = gql`query allPostsPop {
 allPosts(orderBy: read_DESC,filter:{
    isPublished:true
  }, first:5) {
        id
        title
        slug
        headline
        createdAt
        imageId
        imageUrl
        reading
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
}`




const ListPageWithData = graphql(QueryPopular)(Popular)

export default ListPageWithData

