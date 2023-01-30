import {userType} from "./userType.js";

const rootType = `#graphql

type Query {
    root : String
}

type Mutation {
    root: String
}`;


export default [rootType, userType]