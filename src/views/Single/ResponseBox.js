import React, {Component} from 'react';
import { Link, withRouter} from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";


const Uid = window.localStorage.getItem('uid');

class ResponseBox extends Component {

static propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  fbId: PropTypes.string,

};

 constructor(props) {
    super(props)
    this.state = { 
    text:''
    }



}

renderThumb(){
  if (this.props.data.loading) {
      return ( <div></div>)

    }
    

     

    if(this.props.data.User.avatar == '' ){

      const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_80,w_80/" + this.props.data.User.facebookUserId + ".jpg"

     return(

         <img src={pic} className="img-circle"  alt="avatar"/>

      )

    }else{

        return(

         <img src={this.props.data.User.avatar} className="img-circle"  alt="avatarID" />

      )

    }


  }

  renderInOut(){


     if(localStorage.getItem('uid') == null){


       return(
      
          <div><i className="far fa-comment" style={{fontSize:'30px'}}></i></div>

        )

     }else{

        return(

            <div>

              {this.renderThumb()}

            </div>


          )

     }

  }

  renderButton(){


    if(localStorage.getItem('uid') == null  && localStorage.getItem('nordic') == null ){

      return(
         <div>
           {this.state.text &&
           <p style={{fontSize:'14px'}}>Login to response this storie</p>

         }
         </div>
        )


    }else{
  

     return(

     <div>

     {this.state.text &&
            <div>    
                         
                          <div onClick={this.handlePost} style={{background:'#000', padding:'5px 10px', color:'#fff', width:'auto', cursor:'pointer', textAlign:'center',float:'left'}}>Publish</div>
            </div>
          }     

  </div>

     )


    }


  }




  render() {
if (this.props.data.loading) {
      return ( <div></div>)

    }
    

    return (
       

            <div className="row" style={{marginBottom:'50px', marginTop:'30px'}}>
             <ToastContainer autoClose={2000} />

               <div className="col-sm-1"></div>
                                
                    <div className="col-sm-10">

                         <div className="row" style={{border:'1px solid #ccc', padding:'20px 10px', background:'#fff'}}>

                            <div className="col-sm-2" style={{width:'60px'}}>{this.renderInOut()}</div>
                             <div className="col-sm-10">


                                    <textarea 
                                     onChange={(e) => this.setState({text: e.target.value})}
                                     value={this.state.text}
                                    className="form-control" id="area" name="comment" rows="3"  placeholder="Write response this storie...." style={{display:'block', resize: 'none', border:'none', boxShadow:'none'}}


                                   />
                                   

                                   {this.renderButton()}
                            </div>

                         </div>

               <div className="col-sm-1"></div>

              </div>

                              

            </div>

                             

    )
  }


handlePost = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      return
    }
     
    const userId = localStorage.getItem('uid');
    const postId = this.props.id;
    const { text } = this.state
  
    await this.props.createCommentMutation({variables: { text , userId, postId }})
     toast('Comment Publish', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.reload();",2000))
  }



 
}




const CREATE_SAVE_COMMENT = gql`
  mutation CreateCommentMutation (
      $text: String,
      $userId: ID,
      $postId: ID
  ) {
    createComment(
        text: $text,
        userId: $userId,
        postId: $postId

    ) {
      id
    }
  }
`

const Queryx = gql`query allPostsx($id: ID!) {

  User(id: $id){
    id
    avatar
    facebookUserId
    member{
      id
      imageUrl
      imageId
    }
  }

}`



export default compose(
 
   graphql(CREATE_SAVE_COMMENT, { name: 'createCommentMutation' }),
   graphql(Queryx, {
    options: { variables: { id: Uid } }
  })
 
 
)(withRouter(ResponseBox))