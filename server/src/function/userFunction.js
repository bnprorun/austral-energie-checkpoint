import { GraphQLError } from "graphql";

const existingEmail = (users, email) => {
  if (
    users.find((user) => {
      return user.email === email;
    })
  ) {
    throw new GraphQLError("L'adresse mail est déjà utilisé", {
      extensions: {
        code: "BAD_USER_INPUT",
        status: 401,
      },
    });
  }
};
const existingAccessCode = (users, code) => {
  const user = users.find((user) => {
    return user.access_code === code;
  });
  return user && user.access_code ? user.access_code : "";
};

export { existingEmail, existingAccessCode };
