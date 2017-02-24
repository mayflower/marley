const electron = require('electron');

exports.loadMenu = (settings) => new Promise((resolve) => {
    settings.get().then((allSettings) => {
        resolve(getMenuForSettings(settings, allSettings));
    });
});

function getMenuForSettings(settings, allSettings) {
    return [
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
                            {title: "speichern unter"},
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
                    accelerator: 'CmdOrCtrl+Space',
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
        },
        {
            label: 'Kompatibilität',
            submenu: [
                {
                    label: 'Joomla: Anführungszeichen konvertieren',
                    type: 'checkbox',
                    checked: allSettings.loadSave.joomla.escapeQuotes,
                    click: (menuItem, browserWindow, event) => {
                        settings.set('loadSave.joomla.escapeQuotes', menuItem.checked);
                    }
                },
                {
                    label: 'Joomla: Kommentare als Sektionen laden',
                    type: 'checkbox',
                    checked: allSettings.loadSave.joomla.convertCommentsToSections,
                    click: (menuItem, browserWindow, event) => {
                        settings.set('loadSave.joomla.convertCommentsToSections', menuItem.checked);
                    }
                }
            ]
        }

    ]
}