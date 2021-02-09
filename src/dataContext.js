import React from 'react'

const DataContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
})

export default DataContext