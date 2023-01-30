import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation Mutation($input: LoginInput) {
    signIn(input: $input) {
      token
      name
      email
      admin
      access_code
      _id
    }
  }
`;

const USER_BY_TOKEN = gql`
  query Query($token: String!) {
    getUserByToken(token: $token) {
      name
      email
      admin
      access_code
      _id
      token
    }
  }
`;

export { SIGN_IN, USER_BY_TOKEN };
