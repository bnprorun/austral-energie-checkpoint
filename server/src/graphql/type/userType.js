const userType = `#graphql
    type User{
        id : ID!
        name: String!
        email: String!
        password: String!
        access_code : String!
        admin: Boolean!
    }

    type UserResponse{
        _id : ID!
        name: String!
        email: String!
        access_code : String!
        admin: Boolean!
    }
    
    type DeleteResponse{
        _id : ID!
        message : String!
    }

    type AuthenticatedUser{
        _id : ID!
        name: String!
        email: String!
        admin: Boolean
        token: String!
        access_code: String!
    }

    input LoginInput{
        email: String!
        password: String! 
    }

    input RegisterInput{
        name: String!
        email: String!
        password: String!
        admin: Boolean!
    }

    input UpdateInput{
        id : ID!
        name: String
        email: String
        password: String
        admin: Boolean
    }

    type Query {
        getUsers: [UserResponse],
        getUserProfil(id: ID!) : UserResponse
        getUserByToken(token: String!) : AuthenticatedUser
    }

    type Mutation {
        registerUser(input: RegisterInput) : UserResponse
        signIn(input: LoginInput) : AuthenticatedUser
        updateUser(input: UpdateInput ) : UserResponse
        deleteUser(id: ID!) : DeleteResponse
    }

`;

export {
    userType
}