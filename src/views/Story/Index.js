import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import slugify from 'slugify';
import {Image} from 'cloudinary-react';
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor,
  AtomicBlockUtils,
  EditorState
} from 'medium-draft';

import mediumDraftExporter from 'medium-draft/lib/exporter';

import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../views/Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class CustomImageSideButton extends ImageSideButton {


  onChange(e) {
    const file = e.target.files[0];
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body);
          this.props.setEditorState(addNewBlock(
                this.props.getEditorState(),
                Block.IMAGE, {
                  src: response.body.secure_url,
                }
              ));
        }
    });
  
    this.props.close();
  }

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
    imageId:'',
     uploadedFile: null,
     editorState: createEditorState(),
      editorEnabled: true,
      placeholder: 'Write here...',
    }

    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];



    this.onChange = (editorState) => {
      this.setState({ editorState, description: document.getElementById("area").value, reading: document.getElementById("word").value  });
   
    };
   
  }

  componentDidMount() {
    this.refs.editor.focus();
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
   
    const { editorState } = this.state;
    // document.getElementById("area").classList.remove("md-block-unstyled");
    const Html = mediumDraftExporter(editorState.getCurrentContent());
    var sluger =  slugify(this.state.title , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
                lower: true          // result in lower case
              })

    var body = Html;
    var result = body.replace(/<[^>]+>/g, '') ;
    const word = result.length;
     const estimatedRaw = word / 500,
     minutes = Math.round(estimatedRaw);

    var effectiveTime = (minutes < 1) ? "a couple of secs" : minutes;
    return (
      
  
     <section className="article-detail-newyork">
        <div className="container">
           <div className="row">

           <div className="col-md-2"></div>
           <div className="col-md-8">
                  <div className="new-content">
                    
                    <div className="post-author-info-top">
                       <div className="col-md-1"  style={{marginLeft:'-10px'}}><img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522390682/logo_google.jpg" alt="logo avatar" className="img-circle"/></div>
                        <div className="col-md-5 col-sm-12">
                          <h5 className="author-name">Nomadic</h5>
                          <p className="author-info">Publishing Platform for everyone. <br /></p>
                        </div>
                      <div className="form-story">

                          <Form>
                          <FormGroup>
                                {this.state.imageUrl === '' ? null :

		                        
                                      <img  style={{borderRadius:'0px', width:'200px',float:'none'}} src={this.state.imageUrl} alt="upload" width="200"/>
                                     
		                        
		                           
		                        }
                          </FormGroup>
                          <FormGroup>

                        
                                
                                <Dropzone
		                          onDrop={this.onImageDrop.bind(this)}
		                          multiple={false}
		                          style={{width:'100%', height:'50px', border:'1px solid #eee'}}
		                          accept="image/*">
		                          <div style={{textAlign:'left', color:'#888',padding:'10px'}}><i className="fas fa-camera" style={{fontSize:'30px', color:'#888'}}></i>&nbsp;&nbsp; klik / drag upload gambar</div>
		                        </Dropzone>


		                         

                          </FormGroup>
                          <FormGroup>
                               <Input type="text" name="title" value={this.state.title} placeholder="Title Storie / Judul Cerita" style={{height:'50px', fontSize:'16px'}}
                                 onChange={(e) => this.setState({title: e.target.value})}
                                  onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                                />
                               <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug" style={{display:'none'}}/>
                          </FormGroup>
                          <FormGroup>
                                <Editor
		                          ref="editor"
		                          editorState={editorState}
		                          onChange={this.onChange}
		                          placeholder='Tuliskan Ide / Cerita mu'
		                          sideButtons={this.sideButtons}
		                        />

		                    <textarea  hidden className="form-control" id="area" name="description" rows="5" value={Html}  style={{display:'none'}}
	                         onChange={(e) => this.setState({description: e.target.value})}
	                         ></textarea>
	                          <input type="hidden" id="word" value={effectiveTime} name="word" className="form-control" placeholder="Time"  style={{display:'none'}}/>
                          </FormGroup>



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
}




export default NewStory;
