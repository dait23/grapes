import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import List from './List';
import popularStore from './Store/Store';





// our main component
const Story = inject('popularStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, populars } = this.props.popularStore;

        if (error) console.error(error);
        else if (loading) return(
            
            <div></div>

          );
        else

        return (

        
    <div>
     
           <div className="header-block"><h3 className="title">Popular Stories</h3></div>

           <div className="trend-postsx">

            <ol className="popular-list">
                     {populars.map((post) => (
                    <List
                      key={post.id}
                      post={post}
                      refresh={() => this.props.data.refetch()}
                    />
                  ))}
           </ol>

           </div>

         </div>

          )
      }
    }
  )
);


const stores = { popularStore };

const Popular = () => (
  <Provider {...stores}>
    <Story />
  </Provider>
);

export default Popular;