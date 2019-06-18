const fs = require('fs');

setInterval(() => {
   fs.unlink('./sdfasdfasdf.js', (err) => {
       if (err) {
           console.log(err);
       }
   });
}, 1000);