const CardFooter = ({ moreInfo, id }) => {
  return (
    <div className="card__content-footer">
      <div className="card__content-footer-icons">
        {moreInfo && (
          <div onClick={
            (e) => {
              e.stopPropagation();
              // navigate to /docs/<taskid>
              window.location.href = `/docs/${id}`;

            }
          } className="card__content-footer-icon">
            <small>More info</small>
            <img src="./images/icons/info-button.png" />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CardFooter;
