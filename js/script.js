// const data = [
//   {
//     id: 1,
//     location: "Lotte Hotel, Yangon",
//     coords: ["lat", "lng"],
//     activities: ["Pooping", "Screaming", "Running"],
//     checkinTime: "12:00am",
//     checkoutTime: "7:00pm",
//   },
// ];

let currentLocationCoords;

const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getCurrentPosition().then(pos => {
  const { latitude, longitude } = pos.coords;
  currentLocationCoords = [latitude, longitude];

  const map = L.map("map", {
    zoomControl: false, //Remove the default zoom controls
  }).setView(currentLocationCoords, 13);

  L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  L.marker(currentLocationCoords).addTo(map).bindPopup("A pretty CSS3 popup.<br> Easily customizable.").openPopup();

  document.querySelector(".btn--current-location").addEventListener("click", function (e) {
    console.log("Clicked");
    map.zoomIn(1);
  });
});
