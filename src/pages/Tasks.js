import { useEffect } from "react";
import { fetchTasks } from "../utils/utils";
import Card from "../components/card/Card";
import "../assets/styles/card.scss";
import { useHistory } from "react-router";

const Tasks = ({ tasks, setTasks, setSettings }) => {
  const history = useHistory();

  useEffect(() => {
    if (!tasks) {
      fetchTasks(setTasks, setSettings);
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
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
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
