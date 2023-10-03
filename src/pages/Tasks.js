import { useEffect } from "react";
import { fetchTasks } from "../utils/utils";
import Card from "../components/card/Card";
import "../assets/styles/card.scss";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
import { refreshToken } from "../utils/token";

const Tasks = ({ tasks, setTasks, setSettings }) => {
  refreshToken();

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (!tasks) {
        await fetchTasks(setTasks, setSettings);
      }
    }
    fetchData();
  }, []);

  const handleClick = (task) => {
    let path = "/tasks/" + task.name;
    history.push(path);
  };

  return (
    <div className="content">
      <div className="content__title">
        <h1 key="widget">Data Cube On-Demand</h1>
      </div>

      <div className="content__warning">
        <p>
          Due to Landsat data specification changes made by USGS for Collection
          2 and improvements to Sentinel-2's data specification, we are
          currently reviewing all of these Cube products to ensure they work
          appropriately. <br />
          <br />
          <strong>As such, the tasks have been temporarily disabled</strong>. We will enable each
          task as the products pass our internal validation.
        </p>
      </div>

      <div className="content__subtitle">
        <div className="content__subtitle-text">
          <small>
            The{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.commonsensing.org.uk/"
            >
              CommonSensing Project
            </a>{" "}
            has implemented a Data Cube to store Analysis Ready Data (ARD)
            satellite data and some derived datasets for a number of satellite
            sensors (Sentinel-1, Sentinel-2, Landsat 4/5/7/8 and SPOT 1 to 5)
            for Fiji, Vanuatu and the Solomon Islands. The{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.opendatacube.org/"
            >
              Open Data Cube
            </a>{" "}
            (ODC) is an open-source geospatial data management and analysis
            software project that helps harness the power of Earth Observation
            data.
            <br />
            <br />
            Using this service, technical users can launch on-demand queries of
            our CommonSensing Data Cube to produce derived Data Products to help
            with their disaster resilience work. The user needs to select the
            required Data Product, their Area-Of-Interest and the relevant input
            parameters. Once submitted, our Data Cube will then produce the
            required Data Product and make it available to the user via a
            download link.
            <br />
            <br />
            The queries that can currently be launched as tasks are listed
            below:
          </small>
        </div>
      </div>

      <div className="card_container">
        {tasks ? (
          tasks.map((task, i) => {
            return <Card key={i} task={task} onClick={handleClick} />;
          })
        ) : (
          <div className="circularProgress">{<CircularProgress />}</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
