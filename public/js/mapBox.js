/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicmF5dGkiLCJhIjoiY2t2Yzh0cjdnMmdwbzJyb2ttMGk5cXZnOSJ9.Ts_1ASzBWOTrqDecosMn8ww';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/rayti/ckvccf9dm2ctb15o8wai2m5l6',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 6,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // App Pop-Up
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
