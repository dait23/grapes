import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
//import NotFound from'../../views/404/'
import { Multiselect } from 'react-widgets'
import PropTypes from 'prop-types';
import 'react-widgets/dist/css/react-widgets.css';
import { toast, ToastContainer } from 'react-toastify';
import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../Api/';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


//import Dlist from './Dlist'




class Welcome extends Component {

  static propTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { 
     
     loading:false

      }

    this.handleChangeVit = this.handleChangeVit.bind(this)
   }
  

  handleChangeVit (value) {

        const map1 = value.map(x => x.id);
        this.setState({ topicsIds: map1 });


         console.log('Topics:', map1);
    }

  

 

  



  render() {

 if (this.props.TQuery.loading) {
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

                         <h4><strong>Welcome</strong> </h4>
                       </div>

                       <div className="form-story" style={{marginTop:'0px'}}>
                         
                           <Form>

                                <FormGroup row>
                                  <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}>Topics</Label>
                                  <Col sm={10}>
                                      <Multiselect
                                       onChange={this.handleChangeVit}
                                        data={this.props.TQuery.allTopics.map((topicx) => (
                                           
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
                                  <Label sm={2} style={{height:'50px', fontSize:'16px', fontWeight:'600'}}></Label>
                                  <Col sm={10}>
                                    <div onClick={this.handleUpdate} style={{background:'#000', padding:'10px 15px', color:'#fff', width:'100px', cursor:'pointer', textAlign:'center',float:'left', marginRight:'20px'}}>Save </div> 
 
                                  </Col>
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

   handleUpdate = async () => {
  
    if (localStorage.getItem('uid') == null) {
      console.warn('only logged in users can create new posts')
      return
    }
     
    const userId = localStorage.getItem('uid');
    const { id, topicsIds} = this.state
  
    await this.props.updateInterestMutation({variables: { id, topicsIds }})
     toast('Update Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 })
  }

}

const TQuery = gql`query allTopics {
  allTopics(orderBy:name_ASC) {
    id
    name
  }
}`

const UPDATE_POST_MUTATION = gql`
  mutation updateInterestMutation (
      $id: ID!
      $topicsIds: [ID!]

  ) {
    updateInterest(
        id: $id,
        topicsIds: $topicsIds,
    ) {
      id
    }
  }
`





export default compose(
  graphql(TQuery, { name: 'TQuery' }),
  graphql(UPDATE_POST_MUTATION, { name: 'updateInterestMutation' })
)(withRouter(Welcome))
