const { BrowserWindow } = require('electron')

// Window Default Settings
const defaultProps = {
    width: 1300,
    height: 1000,
    show: false,
    backgroundColor: '#127e8b',
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
}

class Window extends BrowserWindow {
    constructor ({file, ...windowSettings}) {
        // Create BrowserWindow with these properties
        super({ ...defaultProps, ...windowSettings})
        this.loadURL(file)

        //then show window
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window