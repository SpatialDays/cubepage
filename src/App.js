import Login from "./pages/Login";
import Task from "./pages/Task";
import Tasks from "./pages/Tasks";
import Submission from "./pages/Submission";
import Queue from "./pages/Queue";
import Navbar from "./components/generic/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import "./assets/styles/app.scss";
import "./assets/styles/form.scss";
import { refreshToken, deleteToken } from "./utils/token";

function App() {
  const [tasks, setTasks] = useState(null);
  const [settings, setSettings] = useState(null);

  const [availableProjects, setAvailableProjects] = useState(
    window.localStorage.getItem("projects")
  );

  useEffect(() => {
    if (availableProjects) {
      let projects;
      if (typeof availableProjects === "string") {
        projects = availableProjects.split(",");
      } else {
        projects = availableProjects;
      }
      setAvailableProjects(projects);
    }
  }, []);

  useEffect(() => {
    const FIFTEEN_MINUTES = 1000 * 60 * 15;
    const interval = setInterval(() => {
      if (window.localStorage.getItem("cubetoken")) refreshToken();
    }, FIFTEEN_MINUTES);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Navbar setTasks={setTasks} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/tasks" />
        </Route>
        <Route path="/login" component={() => <Login />} />
        <Route
          path="/logout"
          component={() => {
            deleteToken();
            return <Redirect to="/login" />;
          }}
        />
        <Route
          path="/tasks"
          exact
          component={() => (
            <Tasks
              tasks={tasks}
              setTasks={setTasks}
              setSettings={setSettings}
            />
          )}
        />
        <Route
          exact
          path="/tasks/:taskName"
          component={() => (
            <Task
              tasks={tasks}
              settings={settings}
              setTasks={setTasks}
              setSettings={setSettings}
              availableProjects={availableProjects}
            />
          )}
        />
        <Route exact path="/queue" component={() => <Queue />} />
        <Route exact path="/submission" component={() => <Submission />} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
