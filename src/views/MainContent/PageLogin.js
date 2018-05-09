import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import ReactPlaceholder from 'react-placeholder';
import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../Api/';
import "react-placeholder/lib/reactPlaceholder.css";
import PageTopic from './PageTopic'
import PageInter from './PageInter'

class PageLogin extends Component {

constructor(props) {
    super(props)
    this.state = { 

    isInterested:'',
    loading: true
    }

}

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
            query Draftzzz($id: ID!) {
              User(id: $id){
              id
              isInterested
                  interest{
                  id
                  name
                  topics{
                    id
                    name
                  }
                }
              }
            }
          `
          var queryVars = {
            id: localStorage.getItem('uid')
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {

            //console.log(results)
            if (results.errors) {
             // console.log('cccc')
              //...
             // window.location= "/";
            }
            //var BlogCategory = results.data.BlogCategory


           if ( results.data.User == null){

                return

           }else{

            
          
              that.setState({
              data: results.data.User,
              id:results.data.User.id,
              isInterested:results.data.User.isInterested,
              topics:results.data.User.interest.topics,

              loading:false
             });
             


           }

           
            

              // that.onRead();
           
          })
 

  }



  renderMain(){
   
 

   if(this.state.isInterested == false ){


       return(

          <PageTopic />

       )



   }
   if(this.state.topics == '' ){


       return(

          <PageTopic />

       )



   }

   else{


     return(

        <PageInter />

     )

   }


  }




  render() {
   
if (this.state.loading) {
      return (<div></div>) 


      }
          
  
   
    return (
      
	     
         
           <div>

             {this.renderMain()}
          

           </div>

	    


    )
  }
}





export default PageLogin

