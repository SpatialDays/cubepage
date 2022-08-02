import CardContent from "./CardContent";
import CardImage from "./CardImage";
import CardFooter from "./CardFooter";

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
        <div>
          <CardImage
            className="card__image"
            image={task.img_url}
            alt={task.display_name}
          />
          <CardContent
            title={task.display_name}
            description={task.description}
          />
        </div>
        <CardFooter moreInfo={true} id={task.name} />
      </div>
    </>
  );
};

export default Card;
