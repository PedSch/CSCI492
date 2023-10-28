//the main process entry 
'use strict'

const electron = require('electron');
const path = require('path');
const url = require('url');
const { app,BrowserWindow, Menu, ipcMain} = electron;
const Window = require('./Window')
const DataStoreName = require('./DataStoreName');

//set environment this more so client side 
process.env.NODE_ENV = "development";
//set environment this more so server side
//process.env.NODE_ENV = "production";

//electron no rest error check 
require('electron-reload')(__dirname,
   {
electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
 });

// create a new todo store name "Todos Main"
const NameData = new DataStoreName({ name: 'Name main' })

// Listen for app to be ready
//other main
let mainWindow;
let addWindow;
let scheduleWindow;
let calendarWindow;

app.on('ready', function ()
{
  // Create new window
  mainWindow = new BrowserWindow(
    {
     webPreferences:
    {
   nodeIntegration: true
    }
  });
  // Load html in window
  mainWindow .loadURL(url.format(
    {
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function()
  {
    app.quit();
  });
  // Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});
function createScheduleWindow()
{
  // Create new window
  scheduleWindow = new BrowserWindow(
    {
    webPreferences:
    {
   nodeIntegration: true
    }
  });
  // Load html in window
  scheduleWindow.loadURL(url.format(
    {
    pathname: path.join(__dirname, 'Schedule.html'),
    protocol: 'file:',
    slashes:true
    
  }));
  //initialize with names
  scheduleWindow.once('show', () => 
  {
  scheduleWindow.webContents.send('names', NameData.names)
  })
  // Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
};
// Handle add item window
function createAddWindow()
{
  addWindow = new BrowserWindow(
    {
    width: 300,
    height:250,
    title:'Add Schedule Time ',
    webPreferences:
    {
   nodeIntegration: true
    }
  });
  addWindow.loadURL(url.format(
    {
    pathname: path.join(__dirname,'addWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
 // Handle garbage collection
 addWindow.on('close', function()
 {
  addWindow = null;
});
}
// Catch item:add
ipcMain.on('item:add', function(e, item)
{
  //console.log(item);
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

//handles with calendar 
 //CALENDAR WINDOW fuction 
 function createCalendarWindow()
 {
  // Create new window
  calendarWindow = new BrowserWindow(
    {
      width:  800,
      height: 950,
    webPreferences:
    {
   nodeIntegration: true
    }
  });
  // Load html in window
  calendarWindow.loadURL(url.format(
    {
    pathname: path.join('cal', 'Calendar.html'),
    protocol: 'file:',
    slashes:true,
  }));
  // Build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//insert menu
Menu.setApplicationMenu(mainMenu);
 } //end of createcalendar function 

//menu settings 
const mainMenuTemplate = [
  {
    label: 'File', 
    submenu:[
      {
        label: 'Add Item',
        click()
        {
          createAddWindow();
        }
      },
      {
        label: 'Clear Items',
        click()
        {
          scheduleWindow.webContents.send('item:clear');
          //scheduleWindow.webContents.send('roomNumber:clear');
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
        click (item, focusedWindow) 
        {
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
      label: item,
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
