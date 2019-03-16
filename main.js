// service workers supported
if ("serviceWorker" in navigator) {
  console.log("Service Worker supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("serviceworker.js")
      .then(reg => console.log("Service Worker registered"))
      .catch(err => console.log(`Service Worker error: ${err}`));
  });
}
