import { Injectable } from '@angular/core';
import { Mutations } from '../graphql/mutations';
import { Queries } from '../graphql/queries';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import { map } from 'rxjs/operators';
import { User, Query } from '../types/user-type';
import { Auth } from '../types/auth-type';

@Injectable()
export class UserService {
  mutations = new Mutations();
  queries = new Queries();

  constructor(private apollo: Apollo) { }

  create(user: User): Observable<FetchResult<unknown, Record<string, any>>> {
    return this.apollo.mutate({
      mutation: this.mutations.create(),
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      },
      refetchQueries: [{
        query: this.queries.users()
      }]
    });
  }

  edit(user: User): Observable<FetchResult<unknown, Record<string, any>>> {
    return this.apollo.mutate({
      mutation: this.mutations.edit(),
      variables: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      refetchQueries: [{
        query: this.queries.users()
      }]
    });
  }

  delete(userId: number): Observable<FetchResult<unknown, Record<string, any>, Record<string, any>>> {
    return this.apollo.mutate({
      mutation: this.mutations.delete(),
      variables: {
        id: userId
      },
      refetchQueries: [{
        query: this.queries.users()
      }]
    });
  }

  register(user: User): Observable<Auth> {
    return this.apollo.mutate<Auth>({
      mutation: this.mutations.register(),
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      },
      refetchQueries: [{
        query: this.queries.users()
      }]
    }).pipe(map((response) => {
      return response.data['register'];
    }));
  }

  authenticate(mail: string, psw: string): Observable<Auth> {
    return this.apollo.mutate<Auth>({
      mutation: this.mutations.authenticate(),
      variables: {
        email: mail,
        password: psw
      }
    }).pipe(map((response) => {
      return response.data['authenticate'];
    }));
  }

  get(): Observable<[User]> {
    return this.apollo
      .watchQuery<Query>({ query: this.queries.users() })
      .valueChanges.pipe(map(({ data }) => data.getUsers));
  }

  getById(userId: number): Observable<ApolloQueryResult<Query>> {
    return this.apollo.query<Query>({
      query: this.queries.users(),
      variables: {
        id: userId
      }
    });
  }

}
