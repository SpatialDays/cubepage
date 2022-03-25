# Cube Page
This project was created to interact with cube products as part of the CommonSensing project.

Token authorization is required to use the API and is provided by the CSOpenPortal https://github.com/SatelliteApplicationsCatapult/csopenportal

## Available Scripts

In the project directory, you can run:

`npm run start`

`npm run build`


# Examples

## `View all products`

Select any available tasks to launch cube products.

<div style="width=100%; text-align:center;">
  <img src="./examples/tasks.png" style="width:70%;">
</div>

---

## `Interact with a product with live input validation`

Validates input based on the dynamic settings found in _src/components/form/Validate.js_

<div style="width=100%; text-align:center;">
  <img src="./examples/errors.png" style="width:70%;">
</div>

---

## `Use a map to create WKT aoi`

Draw an AOI onto the map and get live validation on the AOI specified

<div style="width=100%; text-align:center;">
  <img src="./examples/leaflet.png" style="width:70%;">
</div>

---

## `View your queue and download results`

The authorised user gets a list of all the tasks in the queue and can download the results of any completed tasks.

<div style="width=100%; text-align:center;">
  <img src="./examples/queue.png" style="width:70%;">
</div>