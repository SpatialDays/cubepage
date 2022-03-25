import { useEffect, useState } from "react";
import { fetchActiveTasks, checkTask, fetchResults, downloadResult } from "../utils/utils";
import { CircularProgress, Alert } from "@mui/material";

import "../assets/styles/queue.scss";

const Queue = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [loadingActiveTasks, setLoadingActiveTasks] = useState(false);

  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(async () => {
    await fetchActiveTasks(setActiveTasks, setLoadingActiveTasks);
  }, []);

  useEffect(async () => {
    await fetchResults(setResults, setLoadingResults);
  }, []);

  return (
    <>
      <div className="content">
        <div className="queue">
          <div className="content__title">
            <h1 key="widget">Queue</h1>
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
              <div key={i} className="queue-row" onClick={() => {
                checkTask(task.taskid);
              }}>
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
                  fetchResults(setResults, setLoadingResults);
                }}
              />
            </div>
          )}
        </div>
        <div className="results">
          <div className="content__title">
            <h1 key="widget">Results</h1>
          </div>

          <div className="content__subtitle">
            <div className="content__subtitle-text">
              <small>{/* Description */}</small>
            </div>
          </div>
          {results && (
            <>
              {results.map((result, i) => (
                <div
                  key={i}
                  onClick={() => downloadResult(result.taskid)}
                  className="queue-row"
                >
                  {console.log("Result", result)}
                  <div className="queue-col">
                    <p>{result.taskid}</p>
                  </div>
                  <div className="queue-col">
                    <p>{result.dateCompleted}</p>
                  </div>
                  <div className="queue-col">
                    <p>Download</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Queue;
