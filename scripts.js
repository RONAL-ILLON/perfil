document.addEventListener("DOMContentLoaded", function () {
  // Actualizar fecha y hora
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const date = now.toLocaleDateString();

    document.getElementById(
      "current-time"
    ).textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById("current-date").textContent = date;
  }
  setInterval(updateTime, 1000);

  // Obtener ubicación
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          const locationName = data.display_name;
          document.getElementById("location").textContent = locationName;
        })
        .catch((error) => {
          document.getElementById("location").textContent =
            "Ubicación no disponible";
        });
    });
  } else {
    document.getElementById("location").textContent =
      "Geolocalización no soportada";
  }
});
