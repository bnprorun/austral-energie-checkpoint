import { useMutation } from "@apollo/client";
import {
  CalendarIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";
import UserContext from "../context/UserContext";
import { MAKE_CHECK } from "../graphql/userGql";
import moment from "moment";
import "moment/locale/fr";

const HomePage = (props) => {
  const { isAuth } = useContext(AuthenticationContext);
  const { user } = useContext(UserContext);
  const [checkpoints, setCheckpoints] = useState([]);
  const [code, setCode] = useState("");
  const [makeCheck, { data, error }] = useMutation(MAKE_CHECK);
  const formatDate = (date) => {
    const formatedDate = new moment(date).locale("fr");
    // formatedDate.locale("fr");
    return formatedDate.format("LLL");
  };
  const handleChange = (e) => {
    setCode(e.currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await makeCheck({ variables: { code: code } });
  };

  useEffect(() => {
    if (data && data.makeCheck) {
      setCheckpoints(data.makeCheck.checkpoints);
    }
  }, [data]);
  return (
    <>
      <div className="isolate bg-gradient-to-r from-cyan-500 to-blue-500 h-full">
        <div className="px-6 pt-6 lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              {isAuth && user && user.admin ? (
                <>
                  <NavLink
                    to="/admin"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Tableau de bord <span aria-hidden="true">&rarr;</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/admin"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Mon compte <span aria-hidden="true">&rarr;</span>
                  </NavLink>
                </>
              )}
              {!isAuth && (
                <NavLink
                  to="/connexion"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Se connecter <span aria-hidden="true">&rarr;</span>
                </NavLink>
              )}
            </div>
          </nav>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-auto sm:py-48 lg:py-auto">
              <div className="text-left w-96 mx-auto">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Entrez votre code de pointage
                </label>
                <form
                  className="mt-1 flex rounded-md shadow-sm"
                  onSubmit={handleSubmit}
                >
                  <div className="relative flex flex-grow items-stretch ">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={code}
                      onChange={handleChange}
                      className="block w-full rounded-none rounded-l-md border-gray-300 pl-2 sm:text-sm"
                      placeholder="Votre code ..."
                    />
                  </div>
                  <button className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium text-gray-700">
                    <span className="text-white">Entrer</span>
                  </button>
                </form>
                {error && (
                  <p
                    className="flex mt-2 text-sm text-red-800 justify-end font-bold"
                    id="email-error"
                  >
                    <ExclamationCircleIcon className="h-5 mr-2" /> Code
                    incorrect
                  </p>
                )}
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-md mt-4">
                <h1 className="p-3 text-gray-700">Mes pointages</h1>
                <ul role="list" className="divide-y divide-gray-200">
                  {checkpoints &&
                    checkpoints.length > 0 &&
                    checkpoints.map((check, index) => {
                      return (
                        <>
                          <li key={index}>
                            <div href="#" className="block hover:bg-gray-50">
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="truncate text-sm font-medium text-indigo-600">
                                    {check.date}
                                  </p>
                                  <div className="ml-2 flex flex-shrink-0">
                                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                      {check.workTime ? (<>{check.workTime} secondes </>) : (<>non défini</>)}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 6">
                                      <ClockIcon
                                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      {formatDate(check.firstCheck)}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <ClockIcon
                                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <p>{check.lastCheck ? (<>{formatDate(check.lastCheck)}
                                    </>) : (<> pointage en attente</>)}
                                      </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
