import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import {withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import NotFound from'../../views/404/'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'



import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Text from './Text'

import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../../views/Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;



class EditDraft extends Component {

 constructor(props) {
    super(props)
    this.state = { 
    id:'',
    body: '',
    reading:'',
    title: '',
    slug: '',
    imageUrl:'',
    typeId:'cjfvip5jfven40179i4s1w72l',
    imageId:'',
    data:[],
    editorState: EditorState.createEmpty(),
    isPublished: true,
     userId: localStorage.getItem('uid'),
     uploadedFile: null,
    
      placeholder: 'Write here...',
    }


    // this.handleChangeVit = this.handleChangeVit.bind(this)
    //const html = '<p>-- -- <br><strong>Lunes Test</strong>  |  Sales Executive<br>+1 (888) 888-8888</p><img src="https://s3.amazonaws.com/exceedbot-webchat/monday.gif" alt="undefined" style="float:left;height: auto;width: auto"/><p></p>';
   
    
    
   
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState, body: document.getElementById("area").value, reading: document.getElementById("word").value, headline: document.getElementById("headline").value
    });
  };




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
            query Draft($id: ID!) {
              Post(id: $id){
              id
              title
              slug
              body
              imageId
              imageUrl
              reading
              headline
              createdAt
              type{
                id
              }
              topics{
                id
                name
              }
              user{
                id
                username
              }
             
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


           if ( results.data.Post == null){

                window.location= "/";

           }else{

            
          
              that.setState({
              data: results.data.Post,
              id:results.data.Post.id,
              title:results.data.Post.title,
              slug:results.data.Post.slug,
              body:results.data.Post.body,
              createdAt:results.data.Post.createdAt,
              topics:results.data.Post.topics,
              imageUrl:results.data.Post.imageUrl,
              imageId:results.data.Post.imageId,
              reading:results.data.Post.reading,
              headline:results.data.Post.headline,
              typeId:results.data.Post.type.id,
              userId:results.data.Post.user.id,
             
              loading:false
             });
             


           }

           
            

              // that.onRead();
           
          })
 

  }



   

////////////////////////////

  



  render() {

    if(window.localStorage.getItem('uid') == null && window.localStorage.getItem('nordic') == null ){


    return(

               <NotFound />

      )


  }

    //editorState: createEditorState(this.state.body),
    // document.getElementById("area").classList.remove("md-block-unstyled");
  // const html = this.state.body;
  
// const contentBlock = htmlToDraft(this.state.body);

//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       console.log(editorState)
    
    
     
   //const Html = mediumDraftExporter(editorState.getCurrentContent());
 //    const Html= "";


 //    var sluger =  slugify('this.state.title' , {
 //                replacement: '-',    // replace spaces with replacement
 //                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
 //                lower: true          // result in lower case
 //              })

 // //const { editorState } = this.state;
 //  ///////////////////////////////////
       
 //     var string = Html;
 //       var length = 180;
 //       var headliner = string.length > length ?
 //        string.substring(0, length - 3) + "</p>" :
 //        string
       
 //        var steril = headliner.replace(/<[^>]+>/g, '') ;

 //    ////////////////////////////

 //    var body = Html;
 //    var result = body.replace(/<[^>]+>/g, '') ;
 //    const word = result.length;
 //     const estimatedRaw = word / 500,
 //     minutes = Math.round(estimatedRaw);

   
      if (this.state.loading) {
      return (<div></div>)
    }

 
   
    return (
      
  
     <section className="article-detail-newyork">
     <ToastContainer autoClose={2000} />
        <div className="container">
           <div className="row">

           <div className="col-md-2"></div>
           <div className="col-md-8">
                  <div className="new-content">
                    
                    <div className="post-author-info-top">
                     <div className="main-title" style={{marginBottom:'70px'}}>

                       <h4><strong>Draft</strong> Storie</h4>
                     </div>
                       
                        
                      <div className="form-story" style={{marginTop:'0px'}}>

                       <Text 

                        id={this.state.id}
                        title={this.state.title}
                        body={this.state.body}
                        imageId={this.state.imageId}
                        imageUrl={this.state.imageUrl}
                        topics={this.state.topics}

                       />

                      </div>
                        
                       
                    </div>

                  </div>
            </div>

           </div>

        </div>
    </section>

    )
  }

  
}




export default EditDraft;