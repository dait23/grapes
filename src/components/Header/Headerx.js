import React, {Component} from 'react';

import { Link } from 'react-router-dom'
class Header extends Component {


  render() {
   
   
    return (
      <div>
       
        <nav className="navbar navbar-light bg-white fixed-top mediumnavigation">

		 <div className="container">
		  <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
           <a className="navbar-brand" href="/">
		  <img src="https://res.cloudinary.com/nomadic-id/image/upload/v1522308873/logo.png" alt="logo" />
		  </a>
        </div>
		 
		 <div id="navbar" className="navbar-collapse collapse">
		  <ul className="nav navbar-nav navbar-right">
		        
              <li>
                <div className="search-wrapper">
            <div className="input-holder">
              <input className="search-input" type="text" placeholder="Search Nomadic" />
              <button className="search-icon"><i className="fas fa-search" style={{fontSize:'15px', marginTop:'5px'}}></i></button>
            </div>
          </div>
            </li>
            <li><a  style={{fontSize:'20px'}}><i className="far fa-bell"></i></a></li>
            <li><img src="http://res.cloudinary.com/nomadic-id/image/upload/c_scale,r_100,w_35/v1521738089/0_igdpn3.jpg" className="img-circle" style={{margin:'10px 0 0 10px'}} /></li> 
		           
		    </ul>
		 </div> 
		</div>
		    
		  </nav>

      </div>
    )
  }
}




export default Header ;
