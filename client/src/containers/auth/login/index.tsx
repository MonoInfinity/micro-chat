import * as React from 'react';
import { actionLink } from './action';
import { config } from '../../../core/config';

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
      return (
            <>
                  <div className="flex min-h-screen">
                        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                              <div className="w-full max-w-sm mx-auto lg:w-96">
                                    <div>
                                          <img src="/images/icons/logo-48x48.jpg" alt="Micro Chat" />
                                          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                                Sign in to your account
                                          </h2>
                                          <p className="mt-2 text-sm text-gray-600">
                                                Or{' '}
                                                <span className="font-medium text-dodger-blue-600 hover:text-indigo-500">
                                                      start your 14-day free trial
                                                </span>
                                          </p>
                                    </div>

                                    <div className="mt-8">
                                          <a href={`${config.SERVER_URL}${actionLink.loginWithGoogle}`}>
                                                <div className="flex items-center px-6 py-2 space-x-6 bg-white border border-gray-500 rounded-md shadow-md ">
                                                      <img src="/images/google-logo-32x32.jpg" alt="Google" />
                                                      <span className="font-medium">Continue with Google</span>
                                                </div>
                                          </a>
                                    </div>
                              </div>
                        </div>
                        <div className="relative flex-1 hidden w-0 lg:block">
                              <img
                                    className="absolute inset-0 object-cover w-full h-full"
                                    src="/images/login-page.jpg"
                                    alt="login banner"
                              />
                        </div>
                  </div>
            </>
      );
};

export default LoginPage;
