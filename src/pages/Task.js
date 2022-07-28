import { useState, useSearchParams } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import TaskForm from "../components/form/TaskForm";
import {
  fetchTasks,
  findElementInListOfObjects,
  fetchTaskHistory,
} from "../utils/utils";
import Back from "../components/generic/Back";

const Task = ({
  tasks,
  settings,
  setTasks,
  setSettings,
  availableProjects,
}) => {
  const { taskName } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [fetchedTask, setFetchedTask] = useState(null);

  useEffect(async () => {
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    const taskid = params.get("taskid");

    // fetch the params used in the task
    await fetchTaskHistory(taskid, setFetchedTask);
  }, []);

  // Only look for tasks if they do not already exist in the state. This should only be called if there is a direct link to the task.
  useEffect(() => {
    if (!tasks) {
      fetchTasks(setTasks, setSettings);
    }
  }, [fetchTasks, setTasks, setSettings]);

  useEffect(() => {
    if (tasks) {
      const task = findElementInListOfObjects(tasks, taskName, "name");
      setSelectedTask(task);
    }
  }, [taskName, tasks]);

  return (
    <>
      <div className="content">
        <Back />

        {selectedTask ? (
          <>
            <TaskForm
              task={selectedTask}
              settings={settings}
              availableProjects={availableProjects}
              fetchedTask={fetchedTask}
              hasTaskID={fetchedTask ? true : false}
            />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Task;
