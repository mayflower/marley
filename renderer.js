// listen to events
let electron = require('electron');
let fs = require('fs');

electron.ipcRenderer.on('openFile', function(sender, fileName){
   fs.readFile(fileName, 'utf-8', function(err, data) {
       $('#foobar').val(data);
    });
});