import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';
import {toast } from 'react-toastify';

global.fetch = fetch;



// queries and mutations
const allReportQuery = gql`
  {
    allReports(orderBy: createdAt_DESC) {
        id
        text
      createdAt
      updatedAt
       post{
         id
        title
        }
      user{
        id
        username
        member{
          imageId
          imageUrl
        }
      } 
        
     
     }
  }
`;



const createReportMutation = gql`
  mutation createStoryMutation(
      $title: String!,
      $slug: String,
      $body: String,
      $typeId: ID,
      $imageId: String,
      $imageUrl: String,
      $userId: ID,
      $topicsIds: [ID!],
      $headline: String
      
      ) {
    createPost(
       title: $title,
        slug: $slug,
        body: $body,
        typeId: $typeId,
        userId: $userId,
        imageId:$imageId,
        imageUrl:$imageUrl,
        topicsIds: $topicsIds,
        headline: $headline
        ) {
      id
    }
  }
`;

const updateReportMutation = gql`
  mutation updateStoryMutation(
      $id: ID!,
      $title: String!,
      $slug: String,
      $body: String,
      $typeId: ID,
      $imageId: String,
      $imageUrl: String,
      $userId: ID,
      $topicsIds: [ID!],
      $headline: String
      
      ) {
    updatePost(
       id: $id,
       title: $title,
        slug: $slug,
        body: $body,
        typeId: $typeId,
        userId: $userId,
        imageId:$imageId,
        imageUrl:$imageUrl,
        topicsIds: $topicsIds,
        headline: $headline
        ) {
      id
    }
  }
`;




const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const reportStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allReportQuery });
      },
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get reports() {
         return (this.allQuery.data.allReports && toJS(this.allQuery.data.allReports)) || [];
       },
      get count() {
        return this.reports.length;
      }

    });

  }

   createPost = (title, slug, body, typeId, userId, imageId, imageUrl, topicsIds, headline) =>
    client
      .mutate({
        mutation: createReportMutation,
        variables: { title, slug, body, typeId, userId, imageId, imageUrl, topicsIds, headline},
        refetchQueries: [{ query: allReportQuery }]
      })
      .then(() => console.log('Created a new story ..'), toast('Create Story Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/story/all';",2000)) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));


 
   updatePost = (id, title, slug, body, typeId, userId, imageId, imageUrl, topicsIds, headline) =>
    client
      .mutate({
        mutation: updateReportMutation,
        variables: { id, title, slug, body, typeId, userId, imageId, imageUrl, topicsIds, headline},
        refetchQueries: [{ query: allReportQuery }]
      })
      .then(() => console.log('Update Story ..'), toast('Update Story Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/story/all';",2000)) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

  // createPost = title =>
  //   client
  //     .mutate({
  //       mutation: createPostMutation,
  //       variables: { title },
  //       refetchQueries: [{ query: allTeamQuery }]
  //     })
  //     .then(() => console.warn('Created a new post ..'))
  //     .catch(error => console.error(error.message));
}();


export default reportStore;