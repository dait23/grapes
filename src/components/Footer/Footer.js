import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer-houston">
      <div className="container">
        <div className="row">
           <div className="col-md-12 col-sm-12" style={{fontSize:'11px',paddingBottom:'10px'}}>
                 <a href="https://nomadic.co.id" style={{color:'#fff'}}>Nomadic</a> &copy; 2018.
           </div>
        </div>
      </div>
      </footer>
    )
  }
}

export default Footer;
