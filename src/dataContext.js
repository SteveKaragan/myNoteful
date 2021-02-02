import React from 'react'

const dataContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
})

export default dataContext