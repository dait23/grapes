import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import slugify from 'slugify';
import {Image} from 'cloudinary-react';
import {withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NotFound from'../../views/404/'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';


import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../views/Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 6a22d984d907e2a');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}

class NewStory extends Component {

 constructor(props) {
    super(props)
    this.state = { 
    body: '',
    reading:'',
    title: '',
    slug: '',
    imageUrl:'',
    typeId:'cjfvip5jfven40179i4s1w72l',
    imageId:'',
    isPublished: true,
     editorState: EditorState.createEmpty(),
     userId: localStorage.getItem('uid'),
     uploadedFile: null,
  

      placeholder: 'Write here...',
    }
    this.handleChangeVit = this.handleChangeVit.bind(this)
    



    // this.onChange = (editorState) => {
    //   this.setState({ editorState, body: document.getElementById("area").value, reading: document.getElementById("word").value, headline: document.getElementById("headline").value  });
   
    // };


   
  }

  //   componentDidMount() {
  //   this.editor.focus();
  // }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState, body: document.getElementById("area").value, reading: document.getElementById("word").value, headline: document.getElementById("headline").value
    });
  };

////////////////////////////

   handleChangeVit (value) {

        const map1 = value.map(x => x.id);
        this.setState({ topicsIds: map1 });


         console.log('Topics:', map1);
    }

   onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body);
        this.setState({
           imageUrl: response.body.secure_url,
           imageId: response.body.public_id
        });
      }
    });
  }




  render() {

    if(window.localStorage.getItem('uid') && window.localStorage.getItem('nordic') === null ){


    return(

               <NotFound />

      )


  }

  

   
    const { editorState } = this.state;
    // document.getElementById("area").classList.remove("md-block-unstyled");
    const Html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    var sluger =  slugify(this.state.title , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,?]/g,        // regex to remove characters
                lower: true          // result in lower case
              })

  ///////////////////////////////////
       
     var string = Html;
       var length = 180;
       var headliner = string.length > length ?
        string.substring(0, length - 3) + "</p>" :
        string
       
        var steril = headliner.replace(/<[^>]+>/g, '') ;

    ////////////////////////////

    var body = Html;
    var result = body.replace(/<[^>]+>/g, '') ;
    const word = result.length;
     const estimatedRaw = word / 500,
     minutes = Math.round(estimatedRaw);

    var effectiveTime = (minutes < 1) ? "a couple of secs" : minutes;
      if (this.props.data.loading) {
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

                       <h4><strong>New</strong> Storie</h4>
                     </div>
                       
                        
                      <div className="form-story" style={{marginTop:'0px'}}>

                        <Form>
                          <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Title Storie*</Label>
                            <Col sm={10}>
                              <Input type="text" value={this.state.title} name="title"  placeholder="your title storie" style={{height:'50px', fontSize:'16px'}}
                                          onChange={(e) => this.setState({title: e.target.value})}
                                          onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}

                              />
                              <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug" style={{display:'none'}}/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Storie Tags*</Label>
                            <Col sm={10}>
                               <Multiselect
                                       onChange={this.handleChangeVit}
                                        data={this.props.data.allTopics.map((topicx) => (
                                           
                                           {id: topicx.id, name: topicx.name}

                                         
                                          ))}
                                        valueField='id'
                                        textField='name'

                                        placeholder="your storie topic tags"
                                        defaultValue={[]}
                                      />
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                          <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Storie Cover*</Label>
                          <Col sm={6}>
                            <Dropzone
                                    onDrop={this.onImageDrop.bind(this)}
                                    multiple={false}
                                    style={{width:'100%', height:'50px', border:'1px solid #eee'}}
                                    accept="image/*">
                                    <div style={{textAlign:'left', color:'#888',padding:'10px'}}><i className="fas fa-camera" style={{fontSize:'30px', color:'#888'}}></i>&nbsp;&nbsp; klik / drag cover</div>
                                  </Dropzone>
                                      <Label style={{height:'20px', fontSize:'12px', marginTop:'10px', marginLeft:'0px'}}> min 500 × 200px in size</Label>
                          </Col>
                           <Col sm={4}>

                              {this.state.imageUrl === '' ? <i className="far fa-image" style={{fontSize:'50px', color:'#888'}}></i> :

                                  
                             

                                             <Image cloudName={Cloudinary_Name} publicId={this.state.imageId}  crop="scale"  width="50" height="50" alt="cover"/>
                                           
                                  
                                     
                                  }


                           </Col>
                        </FormGroup>

                         <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Storie</Label>
                            <Col sm={10} style={{border:'1px solid #eee'}}>
                               <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                              }}
                              />
                               <textarea  hidden className="form-control" id="area" name="description" rows="5" value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}  style={{display:'none'}}
                               onChange={(e) => this.setState({body: e.target.value})}></textarea>
                                <input type="hidden" id="word" value={effectiveTime} name="word" className="form-control" placeholder="Time"  style={{display:'none'}}
                                onChange={(e) => this.setState({reading: e.target.value})}
                                />
                                <input type="hidden" id="headline" value={steril} name="headline" className="form-control" placeholder="Headline" style={{display:'none'}}
                                 onChange={(e) => this.setState({headline: e.target.value})}

                                />
                       
                            </Col>
                          </FormGroup>
                         
                          <br />
                          <br />

                           <FormGroup row>
                            <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}></Label>
                            <Col sm={10}>
                                 
                       {this.state.title && this.state.body && this.state.topicsIds &&
            <div>    
                         <div onClick={this.handleSave} style={{background:'#000', padding:'10px 15px', color:'#fff', width:'150px', cursor:'pointer', textAlign:'center',float:'left', marginRight:'20px'}}>Save Draft</div> &nbsp;&nbsp;&nbsp;     
                          <div onClick={this.handlePost} style={{background:'#000', padding:'10px 15px', color:'#fff', width:'150px', cursor:'pointer', textAlign:'center',float:'left'}}>Save & Publish</div>
            </div>
          }     
                             </Col>
                            </FormGroup>




                                 <br />
                  <br />
                  <br />
                  <br />

                         </Form>

                      </div>
                        
                       
                    </div>

                  </div>
            </div>

           </div>

        </div>
    </section>

    )
  }

  handlePost = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      return
    }
     
    const userId = localStorage.getItem('uid');
    const { title, slug, body, imageId, imageUrl, topicsIds, typeId, headline, reading,  isPublished } = this.state
  
    await this.props.createPostMutation({variables: { title, slug, body,  userId, imageId, imageUrl, topicsIds, headline, reading , isPublished, typeId }})
     toast('Save & Publish Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/me/stories/publish';",2000))
  }


  handleSave = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      return
    }
    
    const userId = localStorage.getItem('uid');
    const { title, slug, body, imageId, imageUrl, topicsIds, typeId, headline, reading} = this.state
  
    await this.props.createSaveMutation({variables: { title, slug, body,  userId, imageId, imageUrl, topicsIds, headline, reading , typeId }})

      toast('Add Draft Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/me/stories/drafts';",2000))
  
  }
}


const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUserx {
      id
      avatar
    }
  }
`

const FeedQuery = gql`query allTopics {
  allTopics(orderBy:name_ASC) {
    id
    name
  }
}`

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation (
      $title: String!,
      $slug: String,
      $body: String,
      $reading: String,
      $imageId: String,
      $imageUrl: String,
      $userId: ID,
      $typeId: ID,
      $topicsIds: [ID!],
      $headline: String,
      $isPublished: Boolean,
  ) {
    createPost(

       title: $title,
        slug: $slug,
        body: $body,
        reading: $reading,
        userId: $userId,
        imageId:$imageId,
        imageUrl:$imageUrl,
        topicsIds: $topicsIds,
        headline: $headline,
        isPublished: $isPublished,
        typeId: $typeId


    ) {
      id
    }
  }
`

const CREATE_SAVE_MUTATION = gql`
  mutation CreateSaveMutation (
      $title: String!,
      $slug: String,
      $body: String,
      $reading: String,
      $imageId: String,
      $imageUrl: String,
      $userId: ID,
      $typeId: ID,
      $topicsIds: [ID!],
      $headline: String
  ) {
    createPost(

       title: $title,
        slug: $slug,
        body: $body,
        reading: $reading,
        userId: $userId,
        imageId:$imageId,
        imageUrl:$imageUrl,
        topicsIds: $topicsIds,
        headline: $headline,
        typeId: $typeId


    ) {
      id
    }
  }
`


export default compose(
  graphql(FeedQuery),
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' }),
   graphql(CREATE_SAVE_MUTATION, { name: 'createSaveMutation' }),
  graphql(LOGGED_IN_USER_QUERY, { 
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(NewStory))