import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { GraphQLError, isInputObjectType } from "graphql";
import { userModel } from "../../model/userModel.js";
import {
  existingAccessCode,
  existingEmail,
} from "../../function/userFunction.js";

const userResolver = {
  Mutation: {
    async registerUser(root, args, context) {
      if (!context.user)
        throw new GraphQLError("Vous n'êtes pas connecté.", {
          extensions: { code: "UNAUTHENTICATED", status: 401 },
        });
      if (context.user && context.user.admin == false)
        throw new GraphQLError("Vous n'êtes pas admin.", {
          extensions: { code: "UNAUTHORIZED", status: 401 },
        });
      const { name, email, password, admin } = args.input;
      let code = Math.floor(100000 + Math.random() * 900000);
      const users = await userModel.find({
        $or: [{ access_code: code }, { email: email }],
      });
      existingEmail(users, email);
      while (existingAccessCode(users, code) === code) {
        code = Math.floor(100000 + Math.random() * 900000);
      }
      const user = await userModel.create({
        name,
        email,
        password: bcrypt.hashSync(password),
        admin,
        access_code: code,
      });
      return user.toJSON();
    },
    async signIn(root, args, context) {
      const { email, password } = args.input;
      const user = await userModel.findOne({ email: email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, "mySecret");
        return { ...user.toJSON(), token };
      } else {
        throw new GraphQLError(
          "Les informations d'identification sont invalides.",
          {
            extensions: {
              code: "BAD_CREDENTIALS",
              http: { status: 401 },
            },
          }
        );
      }
    },
    async updateUser(root, args, context) {
      if (context.user && context.user.admin == false)
        throw new GraphQLError("Vous n'êtes pas admin", {
          extensions: { code: "UNAUTHORIZED", status: 401 },
        });
      let updatedUser = args.input;
      try {
        const user = await userModel.findOneAndUpdate(
          { _id: updatedUser.id },
          updatedUser,
          { new: true }
        );
        return user.toJSON();
      } catch (error) {
        throw new GraphQLError("Utilisateur introuvable", {
          extensions: {
            code: "NOT_FOUND",
            status: 404,
          },
        });
      }
    },
    async deleteUser(root, args, context) {
      if (!context.user)
        throw new GraphQLError("Vous n'êtes pas connecter", {
          extensions: { code: "UNAUTHENTICATED", status: 401 },
        });
      if (context.user && context.user.admin == false)
        throw new GraphQLError("Vous n'êtes pas admin", {
          extensions: { code: "UNAUTHORIZED", status: 401 },
        });
      try {
        const deletedUser = await userModel.findOneAndDelete({ _id: args.id });
        return { message: "utilisateur supprimé", _id: deletedUser._id };
      } catch (error) {
        throw new GraphQLError("Utilisateur introuvable", {
          extensions: { code: "BAD_INPUT", status: 401 },
        });
      }
    },
  },
};

export { userResolver };
