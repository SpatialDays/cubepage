import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import TaskForm from "../components/form/TaskForm";
import { fetchTasks, findElementInListOfObjects } from "../utils/utils";
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
