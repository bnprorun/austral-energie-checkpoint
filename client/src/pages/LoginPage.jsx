import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthenticationContext from "../context/AuthenticationContext";
import UserContext from "../context/UserContext";
import { SIGN_IN } from "../graphql/userGql";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth} = useContext(AuthenticationContext);
  const { user, setUser} = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN, {
    variables: {
      input: { email: credentials.email, password: credentials.password },
    },
  });

  const handleChange = ({ currentTarget }) => {
    setCredentials({
      ...credentials,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn();
      if (data && data.signIn) {
        setIsAuth(true);
        setUser(data.signIn);
        localStorage.setItem('token', data.signIn.token);
        if(data.signIn.admin){
            navigate("/admin");
        }else{
            navigate("/");
        }
        
      }
    } catch (error) {
        toast.warn("Problème survenu lors de l'authentification");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 isolate bg-gradient-to-r from-cyan-500 to-blue-500 h-full">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom utilisateur
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    autoComplete="current-username"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
