import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Rectangle,
  Polygon,
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";

import onClickOutside from "react-onclickoutside";

const DrawMap = ({ AOI, setAOI, showMap, country }) => {
  const [mapCenter, setMapCenter] = useState(country.center);

  const [rectangleBounds, setRectangleBounds] = useState(null);

  DrawMap.handleClickOutside = () => {
    showMap(false);
  };

  const handleCreate = (e) => {
    const bounds = e.layer._bounds;

    const minX = bounds._southWest.lng;
    const minY = bounds._southWest.lat;
    const maxX = bounds._northEast.lng;
    const maxY = bounds._northEast.lat;

    const aoi =
      "POLYGON((" +
      minX +
      " " +
      minY +
      "," +
      maxX +
      " " +
      minY +
      "," +
      maxX +
      " " +
      maxY +
      "," +
      minX +
      " " +
      maxY +
      "," +
      minX +
      " " +
      minY +
      "))";

    setAOI(aoi);
  };

  const handleDraw = (e) => {
    console.log("Handing draw");
    // wait 50 ms
    setTimeout(() => {
      setRectangleBounds(null);
    }, 100);
  };

  const wktToArray = (wkt) => {
    wkt = wkt.replace("POLYGON", "");
    wkt = wkt.replace("((", "");
    wkt = wkt.replace("))", "");
    wkt = wkt.split(",");
    let output = [];
    wkt.forEach(function (e) {
      let ring = [];
      e = e.split(" ").reverse();
      e.forEach(function (i) {
        ring.push(parseFloat(i));
      });
      output.push(ring);
    });

    console.log(output);

    return output;
  };

  const handleDelete = () => {
    setAOI("");
  };

  const handleMount = () => {
    const drawTool = document.getElementsByClassName(
      "leaflet-draw-draw-rectangle"
    );
    if (drawTool.length === 1) {
      drawTool[0].click();
    }

    // Check if there is already an AOI
    if (AOI) {
      console.log("Handling mount");
      const aoi = wktToArray(AOI);
      setRectangleBounds(aoi);
    }
    //
  };

  return (
    <>
      <MapContainer center={mapCenter} zoom={7}>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreate}
            onDeleted={handleDelete}
            onMounted={handleMount}
            onDrawStop={handleDraw}
            draw={{
              rectangle: true,
              polyline: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{
              edit: false,
            }}
          />
        </FeatureGroup>

        {rectangleBounds && (
          <Polygon
            positions={rectangleBounds}
            pathOptions={{ color: "black" }}
          />
        )}

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => DrawMap.handleClickOutside,
};

export default onClickOutside(DrawMap, clickOutsideConfig);
