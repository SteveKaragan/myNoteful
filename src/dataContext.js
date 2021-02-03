import React from 'react'

const DataContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
})

export default DataContext