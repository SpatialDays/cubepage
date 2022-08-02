function CardContent({ title, location, description }) {
  return (
    <>
      <div className="card__content">
        <p className="card__content-title">{title}</p>
        <p className="card__content-label">{location}</p>
        <p className="card__content-description">{description}</p>
      </div>

    </>
  );
}

export default CardContent;
