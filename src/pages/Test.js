import { useEffect, useState } from "react";
import { fetchTasks, fetchHistory, runExampleParams } from "../utils/utils";
import ReactTooltip from "react-tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

const Test = ({ tasks, setTasks, setSettings, history, setHistory }) => {
  useEffect(() => {
    if (tasks && !history.length) {
      tasks.forEach((task) => {
        history.push({
          task: task.name,
          display_name: task.display_name,
          history: [],
          showHistory: false,
          loadingExample: false,
          status: task.status,
          args: task.args,
        });
      });

      if (history.length) {
        setHistory(history);
      }
    }
  }, [tasks, history]);

  useEffect(() => {
    async function fetchData() {
      await fetchTasks(setTasks, setSettings);
    }
    if (!tasks) {
      fetchData();
    }
  }, []);

  return (
    <div className="content">
      <div className="content__title">
        <h1 key="widget">History and Test Page</h1>
      </div>

      <div className="content__subtitle">
        <div className="content__subtitle-text">
          <small>Run tests on any product and see the product history.</small>
        </div>
      </div>

      <div className="test">
        {history &&
          history.length > 0 &&
          history.map((h, i) => {
            return (
              <div className="test-item" key={"history" + i}>
                <div className="test-item-top">
                  <div className="test-item-top-col">
                    <div className="test-item-top__title">
                      <h1>{h.display_name}</h1>
                    </div>
                  </div>
                  <div className="test-item-top-col">
                    <div className="test-item-top__run">
                      {!h.loadingExample ? (
                        <button
                          className="test-item-top__button"
                          onClick={async () => {
                            await runExampleParams(h);
                            h.loadingExample = true;
                            setHistory([...history]);
                          }}
                        >
                          Run with example params
                        </button>
                      ) : (
                        <button className="test-item-top__button running">
                          <a href="./queue" target="_blank">
                            Running...
                          </a>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="test-item-top-col">
                    <div className="test-item-top__history">
                      <button
                        className="test-item-top__button"
                        onClick={async () => {
                          h.showHistory = !h.showHistory;
                          setHistory([...history]);

                          if (h.showHistory) {
                            await fetchHistory(h.task, history, setHistory);
                          }
                        }}
                      >
                        History
                      </button>
                    </div>
                  </div>
                </div>
                {h.showHistory && (
                  <div className="test-item-bottom-row">
                    <div className="test-item-bottom-col">
                      <div className="test-item-bottom__title">
                        <small>
                          <b>Date Created</b>
                        </small>
                      </div>
                    </div>

                    <div className="test-item-bottom-col">
                      <div className="test-item-bottom__title">
                        <small>
                          <b>Task ID</b>
                        </small>
                      </div>
                    </div>
                    <div className="test-item-bottom-col__small">
                      <div className="test-item-bottom__title">
                        <small>
                          <b>View</b>
                        </small>
                      </div>
                    </div>
                    <div className="test-item-bottom-col__small">
                      <div className="test-item-bottom__title">
                        <small>
                          <b>Success</b>
                        </small>
                      </div>
                    </div>
                  </div>
                )}
                {h.showHistory && (
                  <div className="test-item-bottom">
                    {h.history.length > 0 ? (
                      h.history.map((h2, i) => {
                        
                        let data = JSON.parse(h2.data);
                        let dataKeys = Object.keys(data.args);

                        // Create a string of keys and values
                        let prettyData = dataKeys.map((key) => {
                          // If key doesnt start with aoi
                          if (!key.startsWith("aoi")) {
                            return `${key}: ${data.args[key]}`;
                          }
                        });

                        // remove empty values
                        prettyData = prettyData.filter(Boolean);

                        prettyData = prettyData.join("<br/><br/>");

                        return (
                          <div
                            className="test-item-bottom-row"
                            key={"history-item" + i}
                          >
                            <div className="test-item-bottom-col">
                              <div className="test-item-bottom__title">
                                <small>{h2.dateCreated}</small>
                              </div>
                            </div>

                            <div className="test-item-bottom-col">
                              <div className="test-item-bottom__title">
                                <small>{h2.taskid}</small>
                              </div>
                            </div>
                            <div className="test-item-bottom-col__small">
                              <div className="test-item-bottom__title">
                                <ReactTooltip html={true} />
                                <label
                                  data-tip={prettyData}
                                  htmlFor={{ text: "tooltip" }}
                                >
                                  <small
                                    onClick={() => {
                                      const url = `/tasks/${h2.task}?taskid=${h2.taskid}`;
                                      window.open(url, "_blank");
                                    }}
                                    // cursor pointer
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  >
                                    View
                                  </small>
                                </label>
                              </div>
                            </div>
                            <div className="test-item-bottom-col__small">
                              <div className="test-item-bottom__title">
                                {h2.status === "complete" && (
                                  <div className="success">
                                    <CheckCircleIcon />
                                  </div>
                                )}
                                {h2.status === "failed" && (
                                  <div className="failed">
                                    <CancelIcon />
                                  </div>
                                )}

                                {h2.status === "pending" && (
                                  <div className="pending">
                                    <PendingIcon />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <small>
                        This product is yet to be ran... or theres an error.
                      </small>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Test;
