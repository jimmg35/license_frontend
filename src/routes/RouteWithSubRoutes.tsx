import React from "react"
import { Route } from "react-router-dom";
import { RouteItem } from "./interface";


const RouteWithSubRoutes = (route: RouteItem) => {
  return (
    <Route
      path={route.path}
      element={
        <route.component routes={route.routes}/>
      }
    />
  )
}

export default RouteWithSubRoutes
