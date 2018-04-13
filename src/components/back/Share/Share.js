import React, {Component} from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from 'react-share';
import PropTypes from 'prop-types';


const shareURL = window.location.href;

class Share extends Component {
 

  render() {
   
   
    return (
      
     
       <ul className="social-share">
                    <li>
                              <FacebookShareButton
                      url={shareURL}
                       >
                      <FacebookIcon
                        size={32}

                        round />
                    </FacebookShareButton>
                    </li>
                    <li>
                    <TwitterShareButton
                      url={shareURL}>
                      <TwitterIcon
                        size={32}
                        round />
                    </TwitterShareButton>
                    </li>

                    <li>
                              <LinkedinShareButton
                      url={shareURL}
                      windowWidth={750}
                      windowHeight={600}>
                      <LinkedinIcon
                        size={32}
                        round />
                    </LinkedinShareButton>
                    </li>

                    <li>
                             <EmailShareButton
                      url={shareURL}>
                      <EmailIcon
                        size={32}
                        round />
                    </EmailShareButton>
                    </li>

                    <li>
                      <i className="far fa-bookmark" style={{fontSize:'24px', padding:'5px'}}></i>
                    </li>
               
                </ul>

    )
  }
}


Share.propTypes = {
  url: PropTypes.string
};

export default Share;
