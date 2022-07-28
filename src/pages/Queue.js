import { useEffect, useState } from "react";
import {
  fetchActiveTasks,
  fetchTaskNames,
  checkTask,
  fetchResults,
  downloadResult,
} from "../utils/utils";
import { CircularProgress } from "@mui/material";

import "../assets/styles/queue.scss";

const Queue = () => {
  const [taskNames, setTaskNames] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [loadingActiveTasks, setLoadingActiveTasks] = useState(false);
  const [downloadingTasks, setDownloadingTasks] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchTaskNames(setTaskNames);
    fetchActiveTasks(setActiveTasks, setLoadingActiveTasks);
    fetchResults(setResults);
  }, []);

  return (
    <>
      <div className="content">
        <div className="queue">
          <div className="content__title">
            <h1 key="widget">Task Queue</h1>
          </div>

          <div className="content__subtitle">
            <div className="content__subtitle-text">
              <small>{/* Description */}</small>
            </div>
          </div>
          {activeTasks && (
            <>You have {activeTasks.length} tasks in the queue.</>
          )}
          {activeTasks.map((task, i) => {
            return (
              <div
                key={i}
                className="queue-row"
                onClick={() => {
                  checkTask(task.taskid);
                }}
              >
                <div className="queue-col">
                  <p>{task.taskid}</p>
                </div>
                <div className="queue-col">
                  <p>{task.dateCreated}</p>
                </div>
                <div className="queue-col">
                  <p>Active</p>
                </div>
              </div>
            );
          })}

          {loadingActiveTasks ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (
            <div className="queue__button">
              <input
                type="button"
                value="Refresh"
                onClick={() => {
                  fetchActiveTasks(setActiveTasks, setLoadingActiveTasks);
                  fetchResults(setResults);
                }}
              />
            </div>
          )}
        </div>
        <div className="results">
          <div className="content__title">
            <h1 key="widget">Your Outputs</h1>
          </div>
          {downloadingTasks.length ? (
            <>
              <div className="downloading">
                <small className="downloading__info">
                  Preparing your download of {downloadingTasks.length} tasks.
                  Please do not leave this page, it may take a few minutes.
                </small>

                <div className="downloading__container">
                  <div className="downloading__progress">
                    <CircularProgress />
                  </div>
                  <ul className="downloading__list">
                    <li key="tasks" className="downloading__list-header">
                      <p>Downloading:</p>
                    </li>
                    {downloadingTasks.map((task, i) => {
                      return (
                        <li className="downloading__list-item" key={i}>
                          <p>
                            <b>Name: </b>
                            {task.taskName}
                          </p>
                          <p>
                            <b>ID: </b>
                            {task.taskId}
                          </p>
                          <p>
                            <b>Date: </b>
                            {task.date}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="content__subtitle">
              <div className="content__subtitle-text">
                <small>
                  These are the results from your tasks. Click on the row to
                  download the relevant{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5"
                  >
                    ZIP file
                  </a>
                  .
                </small>
              </div>
            </div>
          )}
          {results && results.length ? (
            <div className="queue results-table">
              <div className="results-row-container">
                {[...results].reverse().map((result, i) => {
                  if (result.status != "complete") {
                    return null;
                  }
                  // Load the JSON of result.data
                  const data = JSON.parse(result.data);
                  const taskName = data.task;
                  const displayName = taskNames[taskName];
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        // Add the task to the downloading tasks
                        setDownloadingTasks([
                          ...downloadingTasks,
                          {
                            taskName: displayName,
                            taskId: result.taskid,
                            date: new Date().toLocaleString(),
                          },
                        ]);
                        downloadResult(
                          result.taskid,
                          downloadingTasks,
                          setDownloadingTasks
                        );
                      }}
                      className="queue-row"
                    >
                      <div className="queue-col">
                        <p>{displayName}</p>
                      </div>
                      <div className="queue-col">
                        <p>{result.dateCompleted}</p>
                      </div>
                      <div className="queue-col">
                        <p>Download</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="loading">
              You don't currently have any outputs. Launch a task to generate
              your first product.
            </div>
          )}
        </div>
        <div className="error-bar">
          <div className="error-text queue__button">
            <input
              type="button"
              className="task-submit"
              value={`${showErrors ? 'Hide' : 'Show'} Errors`}
              onClick={() => {
                setShowErrors(!showErrors);
              }}
            />
          </div>
        </div>
        {showErrors && (
          <div className="results">
            <div className="content__title">
              <h1 key="widget">Errors</h1>
            </div>
            <div className="content__subtitle">
              <div className="content__subtitle-text">
                <small>
                  These are the tasks which returned an error for some reason.
                  This could be due to invalid parameters or an error in the
                  task.
                  <br />
                  We look into every error we get, and if we find a solution, we
                  will update the documentation to include it.
                </small>
              </div>
            </div>

            {results && results.length > 0 && (
              <div className="queue results-table">
                <div className="results-row-container">
                  {[...results].reverse().map((result, i) => {
                    if (result.status != "failed") {
                      return null;
                    }
                    // Load the JSON of result.data
                    const data = JSON.parse(result.data);
                    const taskName = data.task;
                    const displayName = taskNames[taskName];
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          // Add the task to the downloading tasks
                          setDownloadingTasks([
                            ...downloadingTasks,
                            {
                              taskName: displayName,
                              taskId: result.taskid,
                              date: new Date().toLocaleString(),
                            },
                          ]);
                          downloadResult(
                            result.taskid,
                            downloadingTasks,
                            setDownloadingTasks
                          );
                        }}
                        className="queue-row"
                      >
                        <div className="queue-col">
                          <p>{displayName}</p>
                        </div>
                        <div className="queue-col">
                          <p>{result.dateCompleted}</p>
                        </div>
                        <div className="queue-col">
                          <p>View log</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Queue;
