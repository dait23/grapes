import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class Featured extends Component {


  render() {
   
   
    return (
      
     
           <div className="row">
	        <div className="col-xs-12" style={{paddingTop:'70px'}}>
	          <div className="main-title">
	            <h4><strong>Featured</strong> Stories</h4>
	          </div>
	        </div>
	        <div className="col-md-4 col-sm-6">
	          <div className="post-type-nevada">
	            <figure className="post-image"> <img src="images/post12.jpg" alt="Image" /> </figure>
	            <div className="post-content">
	              <h4 className="post-title"><a href="single.html">Dissuade ecstatic and properly saw entirely sir</a></h4>
	              <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a href="#" >Brand Raeburn</a></span> <span className="post-date">MAR 22 - 5 min read</span> </div>

	          </div>
	        </div>

	        <div className="col-md-5 col-sm-6">
	          <div className="post-type-newyork">
	            <figure className="post-image"><img src="images/post13.jpg" alt="Image" />  </figure>
	            <div className="post-content">
	             
	              <h4 className="post-title"><a href="article-detail-florida.html">Why laughter endeavor in on my jointure horrible</a></h4>
	              <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers</p>
	                
	              <span className="post-author"><img src="images/author-small-thumb4.jpg" alt="Image" /><a href="#">Micah Benny</a></span> <span className="post-date">MAR 22, 2016</span>
	            </div>
	          </div>
	          <div className="post-type-newyork">
	            <figure className="post-image"><img src="images/post14.jpg" alt="Image" /> </figure>
	             <div className="post-content">
	             
	              <h4 className="post-title"><a href="article-detail-florida.html">Why laughter endeavor in on my jointure horrible</a></h4>
	              <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers</p>
	                
	              <span className="post-author"><img src="images/author-small-thumb4.jpg" alt="Image" /><a href="#">Micah Benny</a></span> <span className="post-date">MAR 22, 2016</span>
	            </div>
	          </div>

	          <div className="post-type-newyork">
	            <figure className="post-image"><img src="images/post15.jpg" alt="Image" /> </figure>
	             <div className="post-content">
	             
	              <h4 className="post-title"><a href="article-detail-florida.html">Why laughter endeavor in on my jointure horrible</a></h4>
	              <p>Thanks to promise minime for the ID. You may have heard of us for our awesome beers</p>
	                
	              <span className="post-author"><img src="images/author-small-thumb4.jpg" alt="Image" /><a href="#">Micah Benny</a></span> <span className="post-date">MAR 22, 2016</span>
	            </div>
	 
	          </div>
	        </div>

	        <div className="col-md-3 hidden-sm visible-xs visible-lg visible-md">
	          <div className="post-type-kansas">
	            <figure className="post-image"> <img src="images/post16.jpg" alt="Image" /> </figure>
	            <div className="post-content"> 
	              <h4 className="post-title"><a href="article-detail-florida.html">The Truth About Despite Being Blind, Guy Climbs Mountains</a></h4>
	              <span className="post-author"><img src="images/author-small-thumb2.jpg" alt="Image" /><a href="#" >Jack Raeburn</a></span> <span className="post-date">MAR 22 - 5 min read</span> </div>
	          </div>
	        </div>

	      </div>

    )
  }
}


const FeaturedLeftQuery = gql`query allPosts {
  allPosts(filter: {
    AND: [{
      isPublished: true
    }, {
      isFeatured: true
    }]
  },orderBy: createdAt_DESC, first:1) {
        id
        title
        slug
        headline
        imageId
        reading
        imageUrl
        user{
           username
           avatar
        }
     }
}`




const ListPageWithData = graphql(FeaturedLeftQuery)(Featured)

export default ListPageWithData
