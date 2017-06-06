if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (registerInto) {
    console.log(registerInto)
  }).catch(function (err) {
    console.log(err);
  });
}