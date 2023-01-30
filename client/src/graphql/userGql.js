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

const MAKE_CHECK = gql`
  mutation MakeCheck($code: String!) {
  makeCheck(code: $code) {
    _id
    admin
    name
    email
    checkpoints {
      workTime
      lastCheck
      firstCheck
      date
      _id
    }
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

export { SIGN_IN, USER_BY_TOKEN, MAKE_CHECK};
