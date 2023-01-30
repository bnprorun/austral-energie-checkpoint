import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { GraphQLError, isInputObjectType } from "graphql";
import { userModel } from "../../model/userModel.js";
import {
  existingAccessCode,
  existingEmail,
} from "../../function/userFunction.js";
import moment from "moment";

moment.locale("fr");

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
      try {
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
      } catch (error) {
        throw new GraphQLError(
          "Les informations d'identification sont invalides.",
          {
            extensions: {
              code: "BAD_CREDENTIALS",
              http: { status: 401 },
            },
          }
        ).toJSON();
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
    async makeCheck(root, { code }, context) {
      const user = await userModel.findOne({ access_code: code });
      if (!user)
        throw new GraphQLError("Mauvais code d'accès", {
          extensions: { code: "BAD_INPUT", status: 401 },
        });
      const indexCheck =
        user.checkpoints && user.checkpoints.length > 0
          ? user.checkpoints.findIndex(
              (check) => check.date === moment().format("DD/MM/YYYY")
            )
          : undefined;
      console.log(indexCheck);
      if (indexCheck === undefined || indexCheck === -1) {
        user.checkpoints.unshift({
          date: moment().format("DD/MM/YYYY"),
          firstCheck: moment().format(),
        });
        console.log(user);
        const result = await userModel.findOneAndUpdate(
          { _id: user._id },
          user,
          { new: true }
        );
        return result.toJSON();
      }
      if (
        user.checkpoints[indexCheck] &&
        user.checkpoints[indexCheck].lastCheck == undefined
      ) {
        const a = new moment(user.checkpoints[indexCheck].firstCheck);
        const b = new moment();
        user.checkpoints[indexCheck].lastCheck = moment().format();
        user.checkpoints[indexCheck].workTime = b.diff(a, "seconds");
        const result = await userModel.findOneAndUpdate(
          { _id: user._id },
          user,
          { new: true }
        );
        return user.toJSON();
      } else {
        return {...user.toJSON() };
      }
    },
  },
  Query: {
    async getUserByToken(root, args, context) {
      const { token } = args;
      if (!token)
        throw new GraphQLError("Token non défini", {
          extensions: {
            code: 404,
          },
        });
      const { id } = jwt.verify(token, "mySecret");
      const user = await userModel.findById(id);
      return { ...user.toJSON(), token };
    },
    async getUserProfil(root, args, context) {
      const user = await userModel.findById({ _id: args.id });
      if (!user) throw new GraphQLError("User not found !");
      console.log(user);
      return user.toJSON();
    },
  },
};

export { userResolver };
