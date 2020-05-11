import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class Queries {

  users = (): DocumentNode => {
    return gql`
        query getUsers {
          getUsers{
            id
            firstName
            lastName
            email
          }
        }
    `;
  }
}
