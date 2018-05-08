import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dlist from './Dlist'

import NotFound from'../../../views/404/'

import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../../Api/';


class StatWritter extends Component {

  constructor(props) {
    super(props)
    this.state = {

     id:'',
     name:'',
     loading:true


     }

   }


   ////////////////// did mount 
  componentDidMount() {
    var that = this;
    that.getData();
  }

   ////////////////////get data

  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Publish($id: ID!) {
              Publishing(id: $id){
              id
              name
             
              }
            }
          `
          var queryVars = {
            id: this.props.match.params.id
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {

            //console.log(results)
            if (results.errors) {
             // console.log('cccc')
              //...
              window.location= "/";
            }
            //var BlogCategory = results.data.BlogCategory


           if ( results.data.Publishing == null){

                window.location= "/";

           }else{

              that.setState({
              data: results.data.Publishing,
              id:results.data.Publishing.id,
              name:results.data.Publishing.name,
              loading:false
             });


           }

            

              // that.onRead();
           
          })
 

  }


renderList(){
    const inList = this.props.data.allPosts || [ ]
  

  if(this.props.data.allPosts == ''){
 
   
    return(
         
         <div>
         <p>No Storie Yet !!!</p>
         <br />
           <a href={`/me/publication/new-story/${this.state.id}`}  style={{margin:'5px 0px', fontSize:'14px', border:'1px solid #333', padding:'10px', textDecoration:'none'}} alt="Add new draft"><i className="far fa-edit" style={{fontSize:'20px'}}></i>&nbsp;&nbsp; New Storie</a>
         </div>

      )

  }else{
      
      return(
   
          
          <div>
               {inList.map((post) => (
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

    if (this.state.loading) {
      return ( 
           
           <div>
            <div className="candy-wrapper">
          <div className="main">
            <div className="row inner" style={{paddingTop:'100px'}}>

            <div className="col-md-3"></div>
              

            <div className="col-md-9">
                <div className="main-title">
                  <h4><strong>My Publish</strong> Storie</h4>

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
                  <h4><strong>{this.state.name}</strong> My Draft </h4>
                   <div className="pull-right" style={{marginTop:'40px', textTransform:'capitalize', fontSize:'13px'}}><Link to="/me/stories/drafts"></Link></div>
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

const QueryPublish = gql`query allPostsPublish($id: ID!,  $uid: ID) {
 allPosts(filter: {
    AND: [{
      isPublished: false
    }, {
      publishing:{
        id: $id
      },
      user:{
        id: $uid
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
        reading
        read
        type{
          name
        }
        publishing{
          id
          name
          slug
          user{
            id
          }
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



const ListPageWithData = graphql(QueryPublish, {
  options: (props) => ({ variables: { id: props.match.params.id, uid: Uid  } })
})(StatWritter)



export default ListPageWithData
