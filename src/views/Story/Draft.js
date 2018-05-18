import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dlist from './Dlistx'

import NotFound from'../../views/404/'


class Draft extends Component {

renderList(){
 const inListx = this.props.data.allPosts || []
  
  if(this.props.data.allPosts == ''){

   
    return(
         
         <div>
         <p>No Storie Yet !!!</p>
         <br />
           <a href="/new-story"  style={{margin:'5px 0px', fontSize:'14px', border:'1px solid #333', padding:'10px', textDecoration:'none'}} alt="Add new storie"><i className="far fa-edit" style={{fontSize:'20px'}}></i>&nbsp;&nbsp; New Storie</a>
         </div>

      )

  }else{
      
      return(

          
          <div>
               {inListx.map((post) => (
                    <Dlist
                      key={post.id}
                      post={post}
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
                  <h4><strong>My Draft</strong> Storie</h4>

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
                  <h4><strong>My Draft</strong> Stories </h4>
                   <div className="pull-right" style={{marginTop:'40px', textTransform:'capitalize', fontSize:'13px'}}><a href="/me/stories/publish">Publish</a></div>
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

const QueryDraft = gql`query allPostsDraft($id: ID!) {
 allPosts(filter: {
    AND: [{
      isPublished: false
    }, {
      user:{
        id: $id
      },
      type:{
        name:"Story"
      }
    }]
  },orderBy: createdAt_DESC) {
        id
        title
        slug
        headline
        createdAt
        imageId
        imageUrl
        read
        reading
         type{
          name
        }
        publishing{
          name
          slug
        }
        user{
          username
          facebookUserId
          avatar
          member{
            firstName
            lastName
          }
        }

        _commentsMeta{
          count
        }
           
     }

     
}`





const ListPageWithData = graphql(QueryDraft, {
  options: { variables: { id: Uid } }
})(Draft)

export default ListPageWithData
