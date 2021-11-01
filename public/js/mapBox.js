/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicmF5dGkiLCJhIjoiY2t2Z3BwMWYzMWJwNTMwbjN6djRxMHZsNiJ9.1oTHB80Hc-LzYfb-gPhuwQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/rayti/ckvgptkhf075z14oavl5oeqqv',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 6,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add Popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

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
