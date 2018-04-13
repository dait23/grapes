
import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import List from './List';
import helpStore from './views/Store/Store';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Help = inject('helpStore')(
     
     observer(
       
        class extends Component {

           render() {

              
              const { error, loading, relateds } = this.props.helpStore;

            
      
            return (

                 <div>

                    {relateds.map((page) => (
                          <List
                      key={page.id}
                      page={page}
                    />
                ))}


                 </div>


              )


           }


        }



      )



  );


const stores = { helpStore };

const Related = () => (
  <Provider {...stores}>
    <Help />
  </Provider>
);

export default Related;