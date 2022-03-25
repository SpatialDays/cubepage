import { useEffect } from "react";
import { fetchTasks } from "../utils/utils";
import Card from "../components/card/Card";
import "../assets/styles/card.scss";
import { useHistory } from "react-router";

const Tasks = ({ tasks, setTasks, setSettings }) => {
  const history = useHistory();

  useEffect(async () => {
    if (!tasks) {
      await fetchTasks(setTasks, setSettings);
    }
  }, []);

  const handleClick = (task) => {
    let path = "/tasks/" + task.name;
    history.push(path);
  };

  return (
    <div className="content">
      <div className="content__title">
        <h1 key="widget">Tasks</h1>
      </div>
      <div className="content__subtitle">
        <div className="content__subtitle-text">
          <small>
            The <a href="https://www.opendatacube.org/">Open Data Cube</a> (ODC) is an open source geospatial data
            management and analysis software project that helps harness the
            power of Earth Observation data.
            <br /> <br/>
            The <a href="https://www.commonsensing.org.uk/">CommonSensing Project</a> has implemented a Data Cube to store
            Analysis Ready Data (ARD) satellite data and some derived datasets
            for a number of satellite sensors (Sentinel-1, Sentinel-2, Landsat
            4/5/7/8 and SPOT 1 to 5) for Fiji, Vanuatu and the Solomon Islands.
            <br /><br/>
            From this page, technical users can launch queries on-demand of our
            Data Cube to produce derived Data Products. All the user needs to do
            is select the required Data Product, select the required
            Area-Of-Interest and provide the relevant input parameters and our
            Data Cube will produce the required Data Product and provide the
            user with a download link to it.
            <br/><br/>
          </small>
        </div>
      </div>

      <div className="card_container">
        {tasks &&
          tasks.map((task, i) => {
            return <Card key={i} task={task} onClick={handleClick} />;
          })}
      </div>
    </div>
  );
};

export default Tasks;
