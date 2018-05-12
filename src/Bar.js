import React, {Component} from 'react';
import { ProgressBar } from 'reprogressbars';

class Bar extends Component {
 
 constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }


  render() {
   
   
    return (
      
     
       <ProgressBar isLoading={this.state.isLoading} height="2px" color="#1C9963" />


    )
  }
}




export default Bar;
