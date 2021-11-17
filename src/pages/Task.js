import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import TaskForm from "../components/form/TaskForm";
import { fetchTasks, findElementInListOfObjects } from "../utils/utils";

const Task = ({ tasks, settings, setTasks, setSettings }) => {
  const { taskName } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

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
        <span className="back-button" onClick={goBack}>
          <svg
            aria-hidden="true"
            focusable="false"
            width="20px"
            height="20px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M15 4l-8 8l8 8"
                stroke="#626262"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <p>Back</p>
        </span>
        {selectedTask ? (
          <>
            <TaskForm task={selectedTask} settings={settings} />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Task;
