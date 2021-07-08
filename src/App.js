import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import FormScreen from "./screens/FormScreen";
import { addUser, updateUser } from "./actions/userActions";
import Homepage from "./screens/Homepage";
import FormScreenUpdate from "./screens/FormScreenUpdate";

//routing logic
const Routing = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  //submit user details
  function submitHandler(values) {
    dispatch(addUser(values));
    history.push("/");
  }

  //update user details
  function updateHandler(values) {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user[0].id || "";
    dispatch(updateUser(values, id));
    history.push("/");
    localStorage.removeItem("user");
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/adduser">
        <FormScreen onSubmit={submitHandler} exact />
      </Route>
      <Route path="/updateuser/:id">
        <FormScreenUpdate onSubmit={updateHandler} />
      </Route>
    </Switch>
  );
};

//app logic
function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
