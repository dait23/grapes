import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class List extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    refresh: PropTypes.func,
     mutatePost: PropTypes.func,
  }


  constructor(props) {
    super(props);
   this.state = {isToggleOn: true};


  }


renderBookmark(){

  if(this.state.isToggleOn == true) { 
            return (<i className="far fa-bookmark" onClick={this.handleBookmark} style={{cursor: 'pointer', fontSize:'18px', color:'#000'}}></i>);
        } else { 
            return (<i className="fas fa-bookmark" onClick={this.handleUnbook} style={{cursor: 'pointer',  fontSize:'18px', color:'#000'}}></i>);
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


  render () {


     // const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.post.user.facebookUserId + ".jpg"
     const createTime= this.props.post.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017

      var myString = this.props.post.headline;
       const newHeadline = myString.substr(0, myString.length-30); 

    return (     


          
                    <li>
                        
                      <div className="post-type-florida hidden-xs hidden-sm">
                      <figure className="post-image hidden-sm hidden-xs"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId} gravity="center" height="224" width="224" crop="thumb"/> </figure>
                       <figure className="post-image hidden-md hidden-lg"><Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId} gravity="center" height="100"  crop="thumb"/> </figure>
                      <div className="post-content">
                       
                        <div className="post-metas"> <span className="likes pull-left">{createDT}</span> <span className="views pull-right">{this.props.post.reading} min read</span> </div>
                         <h4 className="post-title"> <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`}>{this.props.post.title}</a></h4>
                        <p className="hidden-sm hidden-xs">{newHeadline}</p>
                        <span className="post-author">
                            {this.renderThumb()}<Link to={`/@${this.props.post.user.username}`}>{this.props.post.user.member.firstName} {this.props.post.user.member.lastName}</Link>
                        </span>
                       <span className="pull-right" style={{fontSize:'15px'}}>{this.renderBookmark()}</span>
                      </div>
        
                    </div>


                    <div className="row hidden-md hidden-lg" style={{padding:'10px'}}>

                     <div className="col-md-3 col-sm-3 col-xs-3">
                      <figure className="post-image hidden-md hidden-lg">
                      <Image cloudName={Cloudinary_Name} publicId={this.props.post.imageId} gravity="center" height="70" width="70"  crop="thumb"/> 
                      </figure>
                     

                     </div>
                      <div className="col-md-9 col-sm-9 col-xs-9">

                        <h4 style={{marginTop:'-5px'}}> <a href={`/@${this.props.post.user.username}/${this.props.post.slug}`} style={{fontSize:'14px', fontWeight:'600', fontFamily:'Poppins, sans-serif'}}>{this.props.post.title}</a></h4>
                       <div className="post-metas" style={{color:'#9d9d9d', fontSize:'11px'}}> <span className="likes pull-left">{createDT}  - {this.props.post.reading} min read</span> <span className="views pull-right">{this.renderBookmark()}</span> </div>
                      </div>


                    </div>

                    </li>
      
     
                    
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
