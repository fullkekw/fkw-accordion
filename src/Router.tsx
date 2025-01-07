import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import IRoute from "./interfaces/IRoute";

export const paths = {
  home: '/'
};

export const defaultRoutes: IRoute[] = [
  { path: paths.home, Component: Home }
];

const Router: React.FC = () => {
  return (
    <Routes>
      {defaultRoutes.map(({ path, Component }) => {
        return <Route path={path} Component={Component} key={`?${path}&${Component}`} />;
      })}
      {/* Not found (HTTP 404) */}
      <Route path="/*" element={<Navigate to={paths.home} />} />
    </Routes>
  );
};

export default Router;