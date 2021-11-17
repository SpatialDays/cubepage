import NDVIAnomaly from "../assets/images/tasks/NDVIAnomaly.png";
import Geomedian from "../assets/images/tasks/Geomedian.png";
import LandDegradation from "../assets/images/tasks/LandDegradation.png";
import Indices from "../assets/images/tasks/Indices.png";
import S1Image from "../assets/images/tasks/S1image.png";
import ShorelineChange from "../assets/images/tasks/ShorelineChange.png";
import VegetationChange from "../assets/images/tasks/Vegetationchange.png";
import FractionalCover from "../assets/images/tasks/vF_Fractionalcover.png";
import WaterChange from "../assets/images/tasks/vF_WaterChange.png";
import WaterPermanency from "../assets/images/tasks/WaterPermanency.png";
import WaterQuality from "../assets/images/tasks/Waterquality.png";

export const localImages = {
  "NDVI Anomaly": { NDVIAnomaly },
  "Sentinel-1 Median Composite": { S1Image },
  "Shoreline Extraction": { ShorelineChange },
  "Water Change": { WaterChange },
  "Fractional Cover": { FractionalCover },
  "Land Change": { LandDegradation },
  "Water Quality": { WaterQuality },
  "Water Permanency": { WaterPermanency },
  "Vegetation Change": { VegetationChange },
  "Mosaic Indices": { Indices },
  Geomedian: { Geomedian },
};
