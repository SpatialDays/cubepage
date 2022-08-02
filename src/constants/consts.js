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

export const docs = {
  "WaterPermanency.WaterPermanency_Task": [
    {
      type: "header",
      text: "Water Permanency",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "water-perm.png",
      text: `For every image from the Sentinel-1, Sentinel-2 and Landsat series satellites, a per scene pre-generated water mask was generated. The Water Permanency product uses these water masks to generate its output.

      This product uses these per scene pre-generated water masks to provide information on the permanency of a water surface. The permanency is given as a percentage of the total number of observations in which water is detected in each pixel.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Sensor: As water masks have been generated for Sentinel-2, Sentinel-1, and the Landsat series, all these sensors can be used for this analysis. The sensor you choose depends on the time period you are interested in.

      Time Range: The time period over which you would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period (the holes are a result of cloud cover).
    
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the Product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Area of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and run each chunk separately.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      
      Percentage Confidence: The level of confidence acceptable for a given pixel, 5% is a good starting value.
      
      Mosaic Type: The type of mosaic, either median or mean.  This choice determines how the data within the time range is aggregated together. `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-image",
      subheading: "Outputs",
      image: "output-scale.png",
      caption:
        "Water Permanency example output over a lake, showing variable water permamency at the north end of the Lake.",
      text: "The output product is a single raster image in GeoTIFF format with values ranging from 0 to 100, representing the percentage of how many observations each pixel was recorded as having water on the surface by the selected sensor. ",
      direction: "rtl",
    },
    {
      type: "use-case",
      text: `The Water Permanency product could be used to inform on the fluctuation of water bodies over a time period to help identify water resources vulnerable to drying out or areas of regular flooding.
      
      This image on the right above is for an inland water body in Fiji, Vaturu Dam.  This is a manmade dam that provides water to the dry western division of Viti Levu. In December 2019, water levels were reported to be low in this dam. This product can be used to see the water permanency within the dam. `,
    },
  ],
  "WaterChange.WaterChange_Task": [
    {
      type: "header",
      text: "Water Change",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "water-change.png",
      text: `For every image from the Sentinel-1, Sentinel-2 and Landsat series satellites, a per scene pre-generated water mask was generated. This Water Change product takes advantage of these pre-generated water masks, but provides a change product, in which recorded surface water between two separate time periods can be directly compared.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Baseline Sensor and Analysis Sensor: As water masks have been generated for Sentinel-2, Sentinel-1, and the Landsat series, all these sensors can be used for this analysis. For the best comparison, it is recommended not to mix sensors even though the bands are comparable (but not identical). The baseline sensor is that of the reference year, and the analysis sensor is the one we want to observe the changes in relation to the baseline. The sensor you choose depends on the time period you are interested in.

      Baseline and Analysis Time Range: The two time periods we want to see water change across. The baseline is the reference time period, whilst the analysis is the year we want to observe the changes in relation to the baseline. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series, 20m for Sentinel-1). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
          
      Area of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the Product.  This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.

      Percentage Confidence: The level of confidence acceptable for a given pixel, 5% is a good starting value.
      
      Water Threshold: The value for how strict the water masking should be, ranging from 0 for always land and 1 for always water, 0.3 is a good starting value. `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-image",
      subheading: "Outputs",
      image: "output-1.png",
      imagefit: "contain",
      caption: `In the water change threshold product, only values of 0 and 1 exist, this product shows how the meander of a river has moved over several decades`,
      text: `Two output products are produced in GeoTIFF format,

      1. Gradient Change.  This product gives more information than the Threshold Change product, as it shows you the range of values, but this may be more information than the user requires. 
      
      2. Threshold Change.  This product is based on a user-defined threshold and produces binary values of 0 or 1 depending on whether they are above or below the threshold value. 
      
      These output products show where surface water has changed between two time periods.`,
    },
    {
      type: "use-case",
      text: "The image example above shows the long-term changes of the course of the Ba River near the city of Ba, Fiji.",
    },
  ],
  "WaterQuality.WaterQuality_Task": [
    {
      type: "header",
      text: "Water Quality",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "water-quality.png",
      text: `There are several methods by which water quality can be interpreted through satellite imagery.  This product provides a measure of the relative turbidity of a water body. The Normalised Difference Turbidity Index (NDTI) is used, which is defined by the below equation:

      NDTI = (RED – GREEN) / (RED + GREEN)

      This equation is an indicator of the relative turbidity of a water body, as pure water usually has greater reflectance in the green rather than the red wavelengths. However, in more turbid waters, it is reported that the reflectance in the red wavelength increases.  The output of this product is an index that improves our view of turbidity. Higher values of NDTI indicate higher turbidity and lower values, less turbidity.  Values range from -1 to 1.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Sensor: Only two sensors are applicable to NDTI, Sentinel-2 and the Landsat series because only multi-spectral sensors can be used.  The sensor you choose depends on the time period you are interested in.

      Time Range: The time period over which you would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period (the holes are a result of cloud cover).
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the Product.  This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Area of Interest:  The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      
      Mosaic Type: The type of mosaic, either max, median, min or mean.  This choice determines how the data within the time range is aggregated together. 

      Water Threshold: The value for how strict the water masking should be, ranging from 0 for always land and 1 for always water, 0.3 is a good starting value.`,
      direction: "rtl",
    },
    {
      type: "paragraph-with-image",
      subheading: "Outputs",
      image: "output.png",
      text: `The output product is a single band raster image in GeoTIFF format with values ranging from -1 to 1, where values closer to 1 relate to more turbid waters. `,

      caption: `Example water quality output, for the coastal region surrounding Sigatoka. White represents land - which is masked from the analysis. Lighter colours represent more turbid waters.`,
    },
    {
      type: "use-case",
      text: "The image example above is a water quality output product for the coastal region surrounding Sigatoka.  White represents land that is masked from the analysis.  The lighter purple colours represent more turbid waters.",
    },
  ],
  "ShorelineExtraction.ShorelineExtraction_Task": [
    {
      type: "header",
      text: "Shoreline Extraction",
    },
    {
      type: "coming-soon",
    },
  ],
  "FractionalCover.FractionalCover_Task": [
    {
      type: "header",
      text: "Fractional Cover",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "FractionalCover.jpg",
      text: `Fractional Cover is a land cover product containing three bands for the area selected.  Each pixel is given a fraction in each band, representing the land cover at the surface. The three fractions are -
      Bare Soil (BS) - areas where no vegetation cover exists. 
      Photosynthetic Vegetation (PV) - areas where the vegetation is still active and 'green'.
      Non-photosynthetic Vegetation (NPV) - areas where the vegetation is 'dead' such as branches and fallen leaves or dry vegetation.
      
      The total value of each pixel equals 100, this is split between the three fractions e.g. a pixel containing mostly fresh vegetation, but with small areas of bare soil, may be represented as BS 10, PV: 90, NPV: 0. 
      
      The fractions are represented as an RGB image, where the color represents the dominance of each fraction within a pixel -
      BS - Red
      PV - Green
      NPV - Blue

      The algorithm used to calculate Fractional Cover was developed by Digital Earth Australia and is not specifically calibrated for Fiji.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Sensor: Only two sensors are applicable to Fractional Cover, Sentinel-2 and the Landsat series because only multi-spectral sensors can be used.  The sensor you choose depends on the time period you are interested in.

      Time Range: The time period over which you would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period (the holes are a result of cloud cover).
      
      Coordinate Reference System:  The Coordinate Reference System (CRS) desired for the Product.  This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.

      Area of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.

      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-image",
      subheading: "Outputs",
      image: "legend.png",
      imagefit: "contain",
      text: `The output product is a 3-band raster image in GeoTIFF format.
      
      The triangle on the left shows the relevant fractions out of 100% of Bare Soil, Photosynthetic Vegetation and Non-photosynthetic Vegetation in a pixel, and gives an indication of the output product colours. `,
    },
  ],
  "NDVIAnomaly.NDVIAnomaly_Task": [
    {
      type: "header",
      text: "NDVI Anomaly",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "NDVI-anomaly.png",
      text: `The Normalised Difference Vegetation Index (NDVI) represents the ‘greenness’ of a vegetated surface, which relates to the chlorophyll content of the vegetation.  It is calculated using the Red and Near-Infrared (NIR) Bands of an optical sensor, based upon this equation: 
      NDVI = (NIR – RED)/(NIR + Red) 

      The resulting NDVI value tells us how vegetated a surface is.  For each pixel, the value ranges from minus one (-1) to plus one (+1); a surface with non-green vegetation would give you a value close to zero, whilst values closer to +1 indicate the highest density of green vegetation.

      This product examines the changes in NDVI between two time periods. It is recommended that these two time periods are seasonally comparable to prevent ‘changes’ being seen as a result of seasonal variation (e.g. both time periods selected are either for the dry or wet season respectively). Areas of positive change represent an increase in the vegetation density on the surface, whilst negative values represent a decrease in the vegetation density. Values range from -1 to 1.  

      The NDVI Anomaly essentially provides a qualitative indication of how ‘good’ or ‘bad’ the current vegetation situation is when compared to a reference season. 

      The workflow followed by the Data Cube to produce this product is provided in the diagram below.`,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `
      Baseline Sensor and Analysis Sensor: Only two sensors are applicable to NDVI Anomaly, Sentinel-2 and the Landsat series because we need the Near Infrared and Red bands from multi-spectral sensors in the algorithm.  For the best comparison, it is recommended not to mix sensors even though the bands are comparable (but not identical). The baseline sensor is that of the reference year, and the analysis sensor is the one we want to observe the changes in relation to the baseline. The sensor you choose depends on the time period you are interested in.

      Baseline and Analysis Time Range: The two time periods with which we want to compare the NDVI, these should be comparable seasonally. The baseline is the reference time period, whilst the analysis is the year we want to observe the changes in relation to the baseline.  If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.

      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.

      Area of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.

      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.

      Mosaic Type: The type of mosaic, either max_ndvi or median. This choice determines how the data within the time range is aggregated together. 

      Water Threshold: The value for how strict the water masking should be, ranging from 0 for always land and 1 for always water, 0.3 is a good starting value. `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-multiple-images",
      subheading: "Outputs",
      images: [
        {
          image: "output-1.png",
          caption:
            "The black areas in this image are where water has been masked.",
        },
        {
          image: "output-2.png",
          caption:
            "The black areas in this image are areas of no-data where clouds have been masked.",
        },
      ],
      direction: "ttb",
      text: `The output Product is a single GeoTIFF file, with values ranging from -1 to 1 where negative values indicate a reduction in surface vegetation relative to the baseline time period, and positive values indicate an increase in surface vegetation.

      If ‘holes’ occur in your output, this could be due to two things:
      Water is present in your AOI – areas of water are masked out during processing.
      Cloud is present in your AOI – cloud is masked out during processing. `,
    },
    {
      type: "use-case",
      text: `"It is May 2016, I am interested in seeing the impacts of tropical cyclone Winston which struck Fiji in February 2016, on the vegetation of Fiji's many islands. I heard from news reports and ground teams that the islands in the southeast of Fiji were impacted. The vegetation on these islands is important for preventing soil erosion, so I am interested to see how the vegetation on this island this year compares to last year."`,
    },
  ],
  "MosaicIndices.MosaicIndices_Task": [
    {
      type: "header",
      text: "Mosaic Indices",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "mosaicindices.png",
      text: `Many indices can be created from satellite imagery, they are usually a ratio of different bands, to enable information about the Earth's surface to be derived. These can be specific to certain locations requiring local parameter adjustments or generic relationships between bands.

      The Indices in this product include options of -
      
      NDVI (Normalised Difference Vegetation Index)​ = (NIR - red) / (NIR + red) 
      
      (NDVI tells us how vegetated a surface is, for each pixel the value ranges from minus one (-1) to plus one (+1); a surface with non-green vegetation would give you a value close to zero, whilst values closer to +1 indicate the highest density of green vegetation)
      

      NDWI (Normalised Difference Water Index) = (green - NIR) / (green + NIR)
      
      (NDWI takes advantage of green and near infrared bands to highlight water bodies.  This index responds in a similar way to built-up areas as it does to water, so can over-estimate water-bodies in these areas.  Values range from -1 to 1, values greater than 0.5 usually correspond to water bodies, with built-up areas between 0 and 0.2, and vegetation much smaller values)
      
      EVI (Enhanced Vegetation Index) = Green ((NIR - Red) / (NIR + C1 Red – C2 * Blue + L)) 
      
      (L is a correction for canopy background. C1 and C2 are values to adjust for atmospheric resistance.  Although ideally these should be set on a per scene basis, these are set at 1 and 6 and 7.5 relatively for this product.  EVI is similar to the NDVI and can also be used to quantify vegetation greenness.  However, EVI corrects for some atmospheric conditions and canopy background noise and is more sensitive in areas with dense vegetation.  The range of  EVI values do go below -1 and 1, though most values are between these numbers, with healthy vegetation generally around 0.20 to 0.80. Higher values indicate denser vegetation)
      
      NDDI (Normalised Difference Drought Index) = (NDVI - NDWI) / (NDVI+NDWI)

      (This index uses two of the other indices in this product namely NDWI and NDVI.  This index was developed by Gu et al (20017) to address drought, as the index takes advantage of NDVI's ability to detect planet matter and NDWI sensing plant moisture.  NDDI values range between -1 and 1 with higher values representing drier conditions, and so more likely drought)
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ttb",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cubeprocess.png",
      text: `Sensor: Only two sensors are applicable to Mosaic Indices, Sentinel-2 and the Landsat series because only multi-spectral sensors can be used.  The sensor you choose depends on the time period you are interested in.

      Start Date: The start of the time period in which you would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      End Date: The end of the time period in which you would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      Indices Type: A choice of indices exist namely EVI, NDVI< NDDI, NDWI_green, NDWI_SWIR. 
      
      Mosaic Type: The type of mosaic, either max, median, min or mean. This choice determines how the data within the time range is aggregated together.
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Area of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.`,
      direction: "rtl",
    },
    {
      type: "paragraph-with-multiple-images",
      subheading: "Outputs",
      text: "",
      images: [
        {
          image: "output-1.svg",
          caption: "NDVI",
        },
        {
          image: "output-1.svg",
          caption: "NDWI",
        },
        {
          image: "output-1.svg",
          caption: "EVI",
        },
        {
          image: "output-1.svg",
          caption: "NDDI",
        },
      ],
      direction: "ttb",
    },
    {
      type: "use-case",
      text: "These indices feed into many of the other products.  Mosaic Indices products are available to enable users to work with these more basic products for more bespoke analysis. The use cases for each product will vary. ",
    },
  ],
  "VegetationChange.VegetationChange_Task": [
    {
      type: "header",
      text: "Vegetation Change",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "vegetationchange.png",
      caption: "Vegetation change threshold product",
      text: `
      This product uses vegetation indices to identify changes in vegetation cover, with a choice of indices to use.  An option to place a threshold to filter the type of vegetation change identified is also offered. 
      
      Indices types are NDVI or EVI, both of which provide information on vegetation cover. 
      
      NDVI is the Normalised Difference Vegetation Index (NDVI) = (NIR – RED)/(NIR + Red) 
      
      (NDVI tells us how vegetated a surface is, for each pixel the value ranges from minus one (-1) to plus one (+1); a surface with non-green vegetation would give you a value close to zero, whilst values closer to +1 indicate the highest density of green vegetation)
      
      EVI is the Enhanced Vegetation Index (EVI) = Green ((NIR - Red) / (NIR + C1 Red – C2 * Blue + L))   
      
      (L is a correction for canopy background.  C1 and C2 are values to adjust for atmospheric resistance. Although ideally these should be set on a per scene basis, these are set at ? and ? and ? for this product. 
      
      EVI is similar to NDVI and can also be used to quantify vegetation greenness. However, EVI corrects for some atmospheric conditions and canopy background noise and is more sensitive in areas with dense vegetation.
      
      Both of these indices are slightly different but work in the same way, to determine the vegetation state. Users should test both to determine which is more appropriate for their area of interest.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below. `,
      direction: "ltf",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Baseline Sensor and Analysis Sensor: Only two sensors are applicable to Vegetation Change, Sentinel-2 and the Landsat series because multi-spectral sensors are required for these algorithms. For the best comparison, it is recommended not to mix sensors even though the bands are comparable (but not identical). The baseline sensor is that of the reference year, and the analysis sensor is the one we want to observe the changes in relation to the baseline. The sensor you choose depends on the time period you are interested in.

      Baseline and Analysis Time Range: The two time periods with which we want to compare the NDVI, these should be comparable seasonally. The baseline is the reference time period, whilst the analysis is the year we want to observe the changes in relation to the baseline. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      Vegetation Threshold Upper and Lower: The thresholds used for the vegetation mask.  For the Upper Threshold, use -0.7 for NVDI, -1.75 for EVI and -70 for FC.  For the Lower Threshold, use 0.2 for NVDI, 0.5 for EVI and -20 for FC. 
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      
      Areas of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Mosaic Type: The type of mosaic, either max, median, geomedian or mean. This choice determines how the data within the time range is aggregated together.
      
      Indices Type: A choice of indices exist namely EVI, NDVI, FC.
      
      Water Threshold: The value for how strict the water masking should be, ranging from 0 for always land and 1 for always water, 0.3 is a good starting value.
      `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-multiple-images",
      subheading: "Outputs",
      images: [
        {
          image: "output-1.jpg",
          caption: "Gradient change product",
        },
        {
          image: "output-2.jpg",
          caption: "Threshold vegetation change product",
        },
      ],
      text: "",
      direction: "ttb",
    },
    {
      type: "use-case",
      text: "Wakaya island was impacted by Cyclone Winston in late February 2016.  This product can help us understand how the vegetation was impacted. ",
    },
  ],
  "LandChange.LandChange_Task": [
    {
      type: "header",
      text: "Land Change",
    },
    {
      type: "paragraph-with-multiple-images",
      subheading: "Description",
      images: [
        {
          image: "PV.jpg",
          caption: "PV",
        },
        {
          image: "BS.jpg",
          caption: "BS",
        },
        {
          image: "NPV.jpg",
          caption: "NPV",
        },
      ],
      caption: "Land change product",
      text: `The Land Change product uses the same algorithm as Fractional Cover but considers the change in each of the three fractions between two time periods.  Positive change in a band shows an increase of this land cover type, whilst negative shows a decrease.

      The three fractions are Bare Soil (BS), Photosynthetic Vegetation (PV), and Non-photosynthetic Vegetation (NPV) and each fraction is represented as values between 0 and 100 (see Fractional Cover product for details).
      
      The three fractions can be used together to help determine not only where changes in land cover have taken place, but an indication of what the land is changing from and to with respect to BS, PV and NPV.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below.
      `,
      direction: "ttb",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      text: `Baseline Sensor and Analysis Sensor: Only two sensors are applicable to Land Change, Sentinel-2 and the Landsat series because multi-spectral sensors are required for these algorithms. For the best comparison, it is recommended not to mix sensors even though the bands are comparable (but not identical). The baseline sensor is that of the reference year, and the analysis sensor is the one we want to observe the changes in relation to the baseline. The sensor you choose depends on the time period you are interested in.

      Baseline and Analysis Time Range: The two time periods with which we want to compare the land cover, these should be comparable seasonally. The baseline is the reference time period, whilst the analysis is the year we want to observe the changes in relation to the baseline. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      
      Areas of Interest: The area that you, as the user, are interested in producing the product for. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products were designed to be done on a regional basis rather than a national basis so, if your Area of Interest is too large, you may even get an error saying so. In this case, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Water Threshold: The value for how strict the water masking should be, ranging from 0 for always land and 1 for always water, 0.3 is a good starting value.
      `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-image",
      subheading: "Outputs",
      image: "output-1.svg",
      text: `The output product comprises three single band GeoTiff files, with values ranging from -100 to 100, where positive change in a band shows an increase of this land cover type, whilst negative shows a decrease. 

      If ‘holes’ occur in your output, this could be due to two things:
      
      Water is present in your AOI – areas of water are masked out during processing.
      Cloud is present in your AOI – cloud is masked out during processing.
      `,
      direction: "ltr",
    },
    {
      type: "use-case",
      text: "This Land Change product can be used to look at changes in land cover which could be useful for impact assessments and damage assessments. ",
    },
  ],
  "Geomedian.Geomedian_Task": [
    {
      type: "header",
      text: "Geomedian",
    },
    {
      type: "paragraph-with-image",
      subheading: "Description",
      image: "Geomedian.png",
      text: `The geomedian is a multi-dimensional median known as a 'geometric median' of surface reflectance for each of the spectral measurements or bands over a time period.

      It is a method for generating pixel-based composite mosaics, in which a temporal stack is mosaiced to produce a higher-quality composite. This reduces the spatial noise whilst maintaining the spectral relationship between bands and consistency across scene boundaries. 
      
      If a large enough time period is selected, the geomedian product is the most appropriate way of getting a cloud-free composite.
      
      The workflow followed by the Data Cube to produce this product is provided in the diagram below.
      `,
      direction: "ltr",
    },
    {
      type: "paragraph-with-image",
      subheading: "Parameters",
      imagefit: "contain",
      image: "cube-process.png",
      caption: "Cube process workflow for creation of geomedian products.",
      text: `Sensor: Two of the available sensors are applicable for the creation of geometric medians, Sentinel-2, and the Landsat series. The sensor you choose depends on the time period you are interested in.

      Time Range: The time period over which the user would like the images for the analysis. If the result has ‘holes’ in it (areas of no data), try increasing the time period, this is a result of cloud cover.
      
      Coordinate Reference System: The Coordinate Reference System (CRS) desired for the product. This is EPSG:3460 for Fiji, and EPSG:3832 for Vanuautu and the Solomon Islands.
      
      Area of Interest: The area the user is interested in for the product. The larger this is, the longer the Data Cube will take to complete it. The Data Cube products are designed to be done on a regional basis rather than a national basis, if the product takes too long to run, you will need to divide your Area of Interest into ‘chunks’ and then run each chunk separately.
      
      Resolution: The spatial resolution of the product, in meters. As a minimum, this should be is the native spatial resolution of a sensor (10m for Sentinel-2, 30m for the Landsat series). Doing larger spatial resolutions (e.g. 100m) will mean your product will run quicker, and you can potentially look at larger areas but you may lose some of the spatial detail.
      
      Water Mask: If you would like water bodies to be masked out, select YES.  For the full image, select NO.
      
      Bands: Select the bands you wish to include in our output product.  Red, Green and Blue are sufficient for a real colour Geomedian product.
      `,
      direction: "rtl",
    },
    {
      type: "paragraph-with-multiple-images",
      subheading: "Outputs",
      images: [
        {
          image: "output-1.png",
          caption:
            "Natural color band combination, with standard deviation stretch type applied.",
        },
        {
          image: "output-2.png",
          caption:
            "A false color composite, where the near-infrared band has been put into the red channel, the red band into the blue channel, and the green band into the blue channel. These band compinations emphasis areas of vegetation in red.",
        },
      ],
      direction: "ttb",
      text: `The output is a multi-band raster product in GeoTIFF format. It is a geometric median of all the images for that sensor in the time period selected. The bands can be viewed in different orders to give different views, e.g. Red, Green, Blue to give a natural colour image as above.`,
    },
    {
      type: "use-case",
      text: "I would like to create a Geomedian product over Suva, so I can use it as a basemap image and then use it for further analysis. ",
    },
  ],
  "S1Median.S1Median_Task": [
    {
      type: "header",
      text: "S1 Median",
    },
    {
      type: "coming-soon",
    },
  ],
};
