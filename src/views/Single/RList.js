import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import { No_Avatar} from '../Api/';
import {Image} from 'cloudinary-react';


import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');




class List extends React.Component {

  static propTypes = {
    comment: PropTypes.object,
      mutatePost: PropTypes.func,
  }

 
 renderRemove(){

  if(this.props.comment.user.id == localStorage.getItem('uid') ){

    return(

        <span style={{fontSize:'12px', color:'#aaa', cursor:'pointer'}} onClick={this.handleDelete} className="pull-right">remove</span>

      )


  }else{

    return
  }


 }


  renderAvatar(){
     const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.comment.user.facebookUserId + ".jpg"

    if(this.props.comment.user.avatar == '' ){

     return(

         <img src={pic} className="img-circle"  />

      )

    }else{

        return(

         <img src={this.props.comment.user.avatar} className="img-circle"  />

      )

    }


  }

  ///////////////
  
  render () {
     //const pic = "https://res.cloudinary.com/nomadic-id/image/facebook/c_scale,r_100,w_100/" + this.props.page.user.facebookUserId + ".jpg"
     const createTime= this.props.comment.createdAt;
      const createDT = moment(createTime).format('ll')//20 Mart 2017

    return (
     
                     <div className="row" style={{marginBottom:'0px', marginTop:'10px'}}>

                       
                            <div className="col-sm-1"></div>
                                
                                <div className="col-sm-10">

                                
                                 <div className="row" style={{border:'1px solid #ccc', padding:'20px 10px', background:'#fff'}}>

                                   <div className="col-sm-12">

                                      <div className="row">

                                        <div className="col-md-4" style={{width:'60px'}}> 

                                           {this.renderAvatar()}

                                        </div>

                                        <div className="col-md-6">

                                           <h5 style={{color:'#1C9963', fontWeight:'600', margin:'5px 0 0 0'}}> <a style={{color:'#1C9963', fontWeight:'600', margin:'5px 0 0 0'}} href={`/@${this.props.comment.user.username}`}>{this.props.comment.user.member.firstName} {this.props.comment.user.member.lastName}</a></h5>
                                           <span style={{color:'#aaa', fontSize:'12px'}}>{createDT}</span>

                                        </div>
                                        <div className="col-md-2 pull-right">{this.renderRemove()}</div>

                                      </div>


                            


                                   </div>
                                   <div className="col-sm-11">


                                    <p style={{fontSize:'14px', padding:'20px 0px'}}>{this.props.comment.text}</p>


                                   </div>

                                 </div>


                                </div>

                                <div className="col-sm-1"></div>



                    </div>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        id: this.props.comment.id,
      }
    })

    window.location.reload();
  }


}

const deleteBanner = gql`
  mutation deleteBanner($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`




const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(List)

export default SliderWithMutation

