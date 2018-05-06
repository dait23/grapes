import React from 'react';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Bar from '../Bar';
export default function Loading({ isLoading, pastDelay, error }) {

  if (isLoading && pastDelay) {
    return <div style={{paddingTop:'50px'}}>
                <Bar />
         
                  
       
          

    </div>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
}
