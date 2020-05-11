import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class Mutations {

  create = (): DocumentNode => {
    return gql`
      mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        addUser(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        ) {
          id
          firstName
          lastName
          email
        }
      }
    `;
  }

  edit = (): DocumentNode => {
    return gql`
      mutation editUser($id:ID!, $firstName: String!, $lastName: String!, $email: String!){
        editUser(
          id: $id
          firstName: $firstName
          lastName: $lastName
          email: $email
        ) {
          id
          firstName
          lastName
          email
        }
      }
    `;
  }

  delete = (): DocumentNode => {
    return gql`
      mutation editUser($id:ID!){
        deleteUser(
          id: $id
        ) {
          id
          firstName
          lastName
          email
        }
      }
    `;
  }

  authenticate = () => {
    return gql`
        mutation authenticate($email: String!, $password: String!) {
          authenticate(email: $email password: $password) {
            allowed
            token
          }
        }
    `;
  }

  register = (): DocumentNode => {
    return gql`
      mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        register(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        ) {
          allowed
          token
        }
      }
    `;
  }
}
