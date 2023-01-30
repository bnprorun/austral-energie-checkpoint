import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";
import UserContext from "../context/UserContext";

const HomePage = (props) => {
  const { isAuth } = useContext(AuthenticationContext);
  const { user } = useContext(UserContext);
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
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Announcing our next round of funding.{" "}
                  <a href="#" className="font-semibold text-indigo-600">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div> */}
              <div className="text-center">
                
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="text-base font-semibold leading-7 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
