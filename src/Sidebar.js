import React, {Component} from 'react';

import Network from './Network'
import Popular from './Popular'
import Bookmark from './Bookmark'

class Sidebar extends Component {


  render() {
   
   
    return (
      
     
           <aside className="sidebar">

              
            <Network />
            <Popular />
            <Bookmark />

            <div style={{width:'100%', float:'left', fontSize:'12px', marginTop:'50px'}} >
           <a href="#">Help</a>&nbsp; &nbsp;<a href="#">About</a>&nbsp; &nbsp;<a href="#">Status</a>&nbsp; &nbsp;<a href="#">Blog</a> &nbsp; &nbsp;<a href="#">Terms</a><br /><a href="#">Privacy</a>&nbsp; &nbsp;<a href="#">Press Kit</a>
            </div>
           </aside>
    )
  }
}




export default Sidebar;
