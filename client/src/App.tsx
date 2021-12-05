import React, { FunctionComponent, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routers } from './core/routers';

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
      return (
            <div className="min-h-screen">
                  <Suspense fallback={<div>Loading </div>}>
                        <Routes>
                              <Route path={routers.LoginPage.link} element={<routers.LoginPage.Component />} />
                              <Route
                                    path={routers.UserProfilePage.link}
                                    element={<routers.UserProfilePage.Component />}
                              />
                        </Routes>
                  </Suspense>
            </div>
      );
};

export default App;
