self.addEventListener('install', function(event) {
    console.log('sw installed')
  });

  self.addEventListener('activate', function(event) {
    console.log('sw activated')
  });

