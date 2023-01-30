const userType = `#graphql
    scalar Date

    type Checkpoint{
        _id: ID!
        date: String!,
        firstCheck: Date!,
        lastCheck: Date,
        workTime: Int
    }

    type User{
        id : ID!
        name: String!
        email: String!
        password: String!
        access_code : String!
        admin: Boolean!
        checkpoints: [Checkpoint]
    }

    type UserResponse{
        _id : ID!
        name: String!
        email: String!
        access_code : String!
        admin: Boolean!
        checkpoints : [Checkpoint]
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

    input CheckpointInput{
        code: String!
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
        makeCheck(code: String!) : UserResponse
    }

`;

export { userType };
