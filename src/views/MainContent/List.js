import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class List extends Component {

static propTypes = {
  post: PropTypes.object,
  refresh: PropTypes.func,
  mutatePost: PropTypes.func,
};

constructor(props) {
    super(props);
   this.state = {isToggleOn: true};


  }


renderBookmark(){

  if(this.state.isToggleOn == true) { 
            return (<i className="far fa-bookmark" onClick={this.handleBookmark} style={{cursor: 'pointer'}}></i>);
        } else { 
            return (<i className="fas fa-bookmark" onClick={this.handleUnbook} style={{cursor: 'pointer'}}></i>);
        } 

}


renderThumb(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"

    if(this.props.post.user.avatar == '' ){

     return(

         <img src={pic} className="img-circle hidden-sm hidden-xs" style={{margin:'5px 0 0 5px', width:'33px'}} />

      )

    }else{

        return(

         <img src={this.props.post.user.avatar} className="img-circle hidden-sm hidden-xs" style={{margin:'0px 5px 0 5px', width:'30px'}} />

      )

    }


  }


renderPublish(){

  if(this.props.post.type.name == "Publishing"){

    return(
        
         <span>  <a href ={`/publishing/${this.props.post.publishing.slug}`}>in {this.props.post.publishing.name}</a> - </span>

      )
  }else{

    return
  }


}


  

  render() {


     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.post.user.facebookUserId + ".jpg"
     //const createTime= this.props.post.createdAt;
      //const createDT = moment(createTime).format('ll')//20 Mart 2017
   
   
    return (
            
   

             
               

                      <div className="row">
                       <div className="post-type-california">

                             <div className="col-md-2 col-sm-3 col-xs-3">
                              
                               <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>
                                  <figure className="post-image-draft hidden-sm hidden-xs"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId}  className="img-responsive" gravity="center" crop="thumb" height="170" width="170" /></figure>
                                  <figure className="post-image-draft hidden-md hidden-lg"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId}  className="img-responsive" gravity="center" crop="thumb" height="125" width="125" /></figure>
                              </a>

                             </div>
                             <div className="col-md-10 col-sm-9 col-xs-9">
                                 
                                 <div className="post-content-page">
                                <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>  <h4 className="post-title">{this.props.post.title}</h4></a>
                                 <p className="hidden-sm hidden-xs">{this.props.post.headline}</p>
                                 <span className="post-author hidden-sm hidden-xs">
                                 {this.renderThumb()}<a href={`/@${this.props.post.user.username}`} style={{marginLeft:'8px'}}>{this.props.post.user.member.firstName} {this.props.post.user.member.lastName}</a>
                                 </span>

                                  <span className="post-author hidden-md hidden-lg">
                                 {this.renderThumb()}<a href={`/@${this.props.post.user.username}`} style={{marginLeft:'0px'}}>{this.props.post.user.member.firstName} {this.props.post.user.member.lastName}</a>
                                 </span>


                                 <span className="post-date">{this.renderPublish()} {moment(this.props.post.createdAt).format('ll')},  {this.props.post.reading} min read</span> 
                                
                                    <span className="pull-right"  style={{fontSize:'18px'}} >{this.renderBookmark()}</span>
                               </div>

                             </div>

                         </div>
                      </div>  

              


       
            

    )
  }

  handleBookmark = async () => {
    await this.props.mutatePost({
      variables: {
        userId: localStorage.getItem('uid'),
        postId: this.props.post.id,
      }
    })

     this.setState({ isToggleOn : false} );
  }
}

const createBookmark = gql`
  mutation createBookmark($userId: ID, $postId:ID) {
    createBookmark(userId: $userId, postId: $postId) {
      id
    }
  }
`




const SliderWithMutation = graphql(createBookmark, {name : 'mutatePost'})(List)

export default SliderWithMutation
