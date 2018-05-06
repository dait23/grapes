import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Topic extends Component {


  render() {
   
   
    return (
    	<div>
      
	     <div className="col-xs-12">
              <div className="main-title">
                <h4><strong>{this.props.title}</strong></h4>
              </div>
         </div>
         <div className="col-xs-12">

             <Link to='/single'>
              <div className="post-type-california">
                  <figure className="post-image"><img src="images/post23.jpg" alt="Image" /></figure>
                   <div className="post-content">
                    <h4 className="post-title">18 Things You Should Learn Before Moving Into a New Home</h4>
                     <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers, chocolate, famous female tennis players, or the unbelievably awesome Themezinho?</p>
                     <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a>Brand Raeburn</a></span><span className="post-date">MAR 22,  5 min read</span> 
                    <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                   </div>
              </div>
             </Link>

               <Link to='/single'>
              <div className="post-type-california">
                  <figure className="post-image"><img src="images/post23.jpg" alt="Image" /></figure>
                   <div className="post-content">
                    <h4 className="post-title">18 Things You Should Learn Before Moving Into a New Home</h4>
                     <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers, chocolate, famous female tennis players, or the unbelievably awesome Themezinho?</p>
                     <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a>Brand Raeburn</a></span><span className="post-date">MAR 22,  5 min read</span> 
                    <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                   </div>
              </div>
             </Link>
              <Link to='/single'>
              <div className="post-type-california">
                  <figure className="post-image"><img src="images/post23.jpg" alt="Image" /></figure>
                   <div className="post-content">
                    <h4 className="post-title">18 Things You Should Learn Before Moving Into a New Home</h4>
                     <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers, chocolate, famous female tennis players, or the unbelievably awesome Themezinho?</p>
                     <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a>Brand Raeburn</a></span><span className="post-date">MAR 22,  5 min read</span> 
                    <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                   </div>
              </div>
             </Link>

              <Link to='/single'>
              <div className="post-type-california">
                  <figure className="post-image"><img src="images/post23.jpg" alt="Image" /></figure>
                   <div className="post-content">
                    <h4 className="post-title">18 Things You Should Learn Before Moving Into a New Home</h4>
                     <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers, chocolate, famous female tennis players, or the unbelievably awesome Themezinho?</p>
                     <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a>Brand Raeburn</a></span><span className="post-date">MAR 22,  5 min read</span> 
                    <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                   </div>
              </div>
             </Link>

              <Link to='/single'>
              <div className="post-type-california">
                  <figure className="post-image"><img src="images/post23.jpg" alt="Image" /></figure>
                   <div className="post-content">
                    <h4 className="post-title">18 Things You Should Learn Before Moving Into a New Home</h4>
                     <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers, chocolate, famous female tennis players, or the unbelievably awesome Themezinho?</p>
                     <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a>Brand Raeburn</a></span><span className="post-date">MAR 22,  5 min read</span> 
                    <span className="pull-right"  style={{fontSize:'18px'}} ><i className="far fa-bookmark"></i></span>
                   </div>
              </div>
             </Link>


  {/* end for row */}
          </div>


  {/* end for */}

        </div>


    )
  }
}

Topic.propTypes = {
  title: PropTypes.string,
  post: PropTypes.object,
};



export default Topic;
