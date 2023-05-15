import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
mutation LoginUser($username: String!, $password: String!) {
    login( input: {
      clientMutationId: "uniqueId",
      username: $username,
      password: $password
    } ) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_POST = gql`
mutation UpdateRirSkjerm($id: ID!, $title: String!) {
  updatePost(input: {
    clientMutationId: "UpdatePost",
    id: $id,
    content: $title
  }) {
    post {
      id
      content
    }
  }
}
`;