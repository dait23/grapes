import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import {MainApi} from '../../views/Api/';
import { extendObservable, toJS } from 'mobx';
// //import { inject, observer, Provider } from 'mobx-react';
// import {toast } from 'react-toastify';

global.fetch = fetch;



// queries and mutations
const allAboutQuery = gql`
  {
    Page(slug:"about-us") {
        id
        title
        description
        imageId
        imageUrl
        updatedAt
        bodyRaw
        reading
     }
  }
`;

// queries and mutations
const allPrivacyQuery = gql`
  {
    Page(slug:"privacy") {
        id
        title
        description
        imageId
        imageUrl
        updatedAt
        bodyRaw
        reading
     }
  }
`;


// queries and mutations
const allTermsQuery = gql`
  {
    Page(slug:"terms") {
        id
        title
        description
        imageId
        imageUrl
        updatedAt
        bodyRaw
        reading
     }
  }
`;

// queries and mutations
const allHelpQuery = gql`
  {
    Page(slug:"help") {
        id
        title
        description
        imageId
        imageUrl
        updatedAt
        bodyRaw
        reading
     }
  }
`;

// queries and mutations
const allRelatedQuery = gql`
  {
    allPages(orderBy:createdAt_DESC, first: 3){
    id
    title
    slug
    reading
    imageId
    imageUrl
  }
  }
`;


const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});


// building a mobx store
const helpStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allAboutQuery });
      },
      get allPrivacy() {
        return graphql({ client, query: allPrivacyQuery });
      },
       get allTerms() {
        return graphql({ client, query: allTermsQuery });
      },
       get allHelp() {
        return graphql({ client, query: allHelpQuery });
      },

       get allRelated() {
        return graphql({ client, query: allRelatedQuery });
      },
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get about() {
         return (this.allQuery.data.Page && toJS(this.allQuery.data.Page)) || {};
       },

       get privacy() {
         return (this.allPrivacy.data.Page && toJS(this.allPrivacy.data.Page)) || {};
       },
       get terms() {
         return (this.allTerms.data.Page && toJS(this.allTerms.data.Page)) || {};
       },

       get help() {
         return (this.allHelp.data.Page && toJS(this.allHelp.data.Page)) || {};
       },

       get relateds() {
         return (this.allRelated.data.allPages && toJS(this.allRelated.data.allPages)) || [];
       },

     
    });

  }

}();


export default helpStore;