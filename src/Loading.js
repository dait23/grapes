import React from 'react';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Bar from './Bar';
export default function Loading({ isLoading, pastDelay, error }) {

  if (isLoading && pastDelay) {
    return <div style={{paddingTop:'50px'}}>
                <Bar />
         
                   <section className="article-detail-newyork">

                   <div className="container">

                         <div className="row">

				              <div className="col-md-2"></div>
				                <div className="col-md-8">
								                 <ReactPlaceholder type='text' showLoadingAnimation={true} delay={1000} ready={false} rows={3} color='#E0E0E0'>
                                   <div></div>
                                  </ReactPlaceholder>
                                  <br/><br/>
                                  <ReactPlaceholder type='media' showLoadingAnimation={true} delay={1000} ready={false} rows={3} color='#E0E0E0'>
	                                  <div></div>
									                </ReactPlaceholder>

									                 <br/><br/>

                                   <ReactPlaceholder type='rect' showLoadingAnimation={true} delay={1000} ready={false} color='#E0E0E0' style={{ width: '100%', height: 300 }}>
                                    <div></div>
                                  </ReactPlaceholder>
                                   <br/><br/>
									
								                  <ReactPlaceholder type='text' showLoadingAnimation={true} delay={1000} ready={false} rows={26} color='#E0E0E0'>
                                     <div></div>
                                  </ReactPlaceholder>
				                </div>
                              </div>

                   </div>

                   

                   </section>

       
          

    </div>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
}
