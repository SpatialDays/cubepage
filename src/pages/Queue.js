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
          {results && (
            <div class="queue results-table">
              <div className="results-row-container">
                {[...results].reverse().map((result, i) => {
                  // Load the JSON of result.data
                  const data = JSON.parse(result.data);
                  const taskName = data.task;
                  const displayName = taskNames[taskName];
                  return (
                    <div
                      key={i}
                      onClick={() => downloadResult(result.taskid)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Queue;
