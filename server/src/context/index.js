import { userModel } from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { GraphQLError } from  "graphql";

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, "mySecret");
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw new GraphQLError("L'utilisateur n'est pas authentifié.", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};

export default async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || "";
  const user = await verifyToken(token);
  return { user };
};