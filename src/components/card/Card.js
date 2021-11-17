import CardContent from "./CardContent";
import CardImage from "./CardImage";

const Card = ({ task, onClick }) => {
  return (
    <>
      <div
        className="card"
        id={task.name}
        onClick={() => {
          onClick(task);
        }}
      >
        <CardImage
          className="card__image"
          image={task.img_url}
          alt={task.display_name}
        />
        <CardContent title={task.display_name} description={task.description} />
      </div>
    </>
  );
};

export default Card;
