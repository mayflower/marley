let electron = require('electron');
exports.mainMenu = [
    {
        label: 'Datei',
        submenu: [
            {
                label: 'Öffnen',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    electron.dialog.showOpenDialog(
                        {properties: ['openFile']},
                        function (fileNames) {
                            if (!fileNames || fileNames.length != 1) {
                                return;
                            }
                            electron.BrowserWindow.getAllWindows()[0].webContents.send(
                                'openFile',
                                fileNames[0]
                            );
                        }
                    );
                }
            },
            {
                label: 'Speichern unter',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    electron.dialog.showSaveDialog(
                        {title:"speichern unter"},
                        function (fileName) {
                            if (!fileName) {
                                return;
                            }
                            electron.BrowserWindow.getAllWindows()[0].webContents.send(
                                'saveFile',
                                fileName
                            );
                        }
                    );
                }
            },
            {
                label: 'Show in Console',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    electron.BrowserWindow.getAllWindows()[0].webContents.openDevTools();
                    electron.BrowserWindow.getAllWindows()[0].webContents.send('saveConsole');
                }
            }
        ]
    },
    {
        label: 'Bearbeiten',
        submenu: [
            {
                label: 'Rückgängig',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            }
        ]
    }
];