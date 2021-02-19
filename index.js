const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
const electron = require('electron');
const path = require('path'); 
const fs = require('fs');
const ipcMain = electron.ipcMain;

const dialog = electron.dialog;

//hold the array of directory paths selected by user

let dir;



//------------------------------------------------------------------------
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL('http://localhost:4200');

  // Open the DevTools.
  win.webContents.openDevTools()

  //trying to create a save thingy
  ipcMain.on('selectDirectory', (event,  arg) => {

    //console.log(arg);
    dialog.showSaveDialog({ 
      title: 'Select the File Path to save', 
      defaultPath: path.join(__dirname, '../assets/sample.csv'), 
      // defaultPath: path.join(__dirname, '../assets/'), 
      buttonLabel: 'Save', 
      // Restricting the user to only Text Files. 
      filters: [ 
        { 
          name: 'CSV Files', 
          extensions: ['csv'] 
        }, ], 
      properties: [] 
    }).then(file => { 
      // Stating whether dialog operation was cancelled or not. 
      console.log(file.canceled); 
      if (!file.canceled) { 
        console.log(file.filePath.toString()); 
        
        // Creating and Writing to the sample.txt file 
        fs.writeFile(file.filePath.toString(), 
              arg, function (err) { 
          if (err) throw err; 
          console.log('Saved!'); 
        }); 
      } 
    }).catch(err => { 
      console.log(err) 
    }); 

  })
  

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.