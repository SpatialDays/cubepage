import { localImages } from "../../constants/consts";

const CardImage = ({ image, onClick, alt, className }) => {
  const localImage = localImages[alt.trim()];
  return (
    <div className={className} onClick={onClick}>
      <img
        style={{ width: "100%", marginTop: "-8%" }}
        src={localImage ? Object.values(localImage)[0] : image}
        alt={alt}
      />
    </div>
  );
};

export default CardImage;
