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
                label: 'Speichern',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    electron.BrowserWindow.getAllWindows()[0].webContents.send(
                        'saveFile',
                        "test.ini"
                    );
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