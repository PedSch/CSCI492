//menu.js 
const electron = require('electron')
const {BrowserWindow, ipcMain } = electron
const {Menu} = require ('electron');
const { $for, document } = require('globalthis/implementation');
const app = electron.app
const {ipcRenderer} = electron;

//set environment this more so client side 
process.env.NODE_ENV = "development";
//set environment this more so server side
//process.env.NODE_ENV = "production";

//build menu from the template
//mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//create menu template 
//array of objects
require('./app')
const mainMenuTemplate = [
    {
      label: 'File', 
      submenu:[
        {
          role: 'Add Item',
          click()
          {
            //require('./app')
            createAddWindow();
            //addWindow.webContents.send('item:add');
            //ipcRenderer.send('addwindow')
  
          }
        },
        {
          label: 'Clear Items',
          click()
          {
            Schedule.webContents.send('item:clear');
          }
        },
        {
          label: 'Quit',
          //this will determine what kind of platform your own mac,pc etcc
          //mac
          //: is else
          accelerator: process.platform == 'darwin'? 'Command+Q':
          'Ctrl+Q',
          click()
          {
            app.quit();
          }
        }
      ] ,
    }
  ];
  
  //edit menu template 
  mainMenuTemplate.push(
    {
    label: 'Edit',
    submenu:[
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      },
      {
        type: 'separator'
      },
      {
        label: 'Speech',
        submenu: [
          {
            role: 'startspeaking'
          },
          {
            role: 'stopspeaking'
          }
        ]
      }
    ]
  })
  //view
  mainMenuTemplate.push(
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }  
        }
      ]
    })
  //IF STATEMENT TO DETERMINE IF WE ARE ON A MAC 
  //IF MAC , ADD EMPTY OBJECT TO MENU
  if (process.platform == 'darwin')
  {
    mainMenuTemplate.unshift(
      {
        label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
  
    }); //unshift is an array method and it adds on to begining of the array 
  
  }
  //add developer tools item if not in production
  // a menu item is just an object
  if (process.env.NODE_ENV !== 'production')
  {
    mainMenuTemplate.push(
      {
      label: 'Developer Tools',
      submenu: [
        {
          label:'Toggle DeveTools',
          accelerator: process.platform == 'darwin'? 'Command+I':
          'Ctrl+I',
          click(item,focusedWindow)
          {
            focusedWindow.toggleDevTools();
          }
        }, 
        {
          role: 'reload'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('http://electron.atom.io') }
        }
      ]
    }
  );
  }
  //build menu from the template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  //insert menu
  Menu.setApplicationMenu(mainMenu);