import React from "react";
import { Switch, Route, withRouter } from "react-router";
import { useRoutePropagation } from "@shopify/app-bridge-react";

import Orders from "./pages/Orders";
import Welcome from "./pages/Welcome";

function Routes(props) {
  const { location } = props;

  useRoutePropagation(location);

  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/orders" component={Orders}/>
    </Switch>
  );
}

export default withRouter(Routes);
