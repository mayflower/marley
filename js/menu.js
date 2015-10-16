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
                accelerator: 'CmdOrCtrl+S'
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