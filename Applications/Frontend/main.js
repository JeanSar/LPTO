const { app } = require('electron')
const Window = require('./Window')


function main() {
    let mainWindow = new Window({
      file: `file://${__dirname}/dist/Frontend/index.html`
    })
    mainWindow.setMenu(null);
}

app.on('ready', main)

app.on('window-all-closed', function() {
  app.quit()
})