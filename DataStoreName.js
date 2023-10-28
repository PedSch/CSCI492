'use strict'
const Store = require('electron-store')

class DataStoreName extends Store
 {
  constructor (settings)
   {
    super(settings)

    // initialize with todos or empty array
   
    this.name = this.get('name') || [] //room name
    
  }

saveNames () 
  {
    // save todos to JSON file
    this.set('names', this.names)
    // returning 'this' allows method chaining
    return this
  }
  getNames () 
  {
    // set object's todos to todos in JSON file
    this.names = this.get('names') || []

    return this
  }
  addName (name)
  {
   // merge the existing todos with the new todo
   this.names = [ ...this.names, name ]

   return this.saveNames()
 }
 deleteName (name)
   {
    // filter out the target todo
    this.names = this.names.filter(n => n !== name)

    return this.saveNames()
  }
}

module.exports = DataStoreName