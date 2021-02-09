import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Folder from './Folder'

describe('Folder component', () => {
    it.skip('renders folder by default', () => {
        const wrapper = shallow(<Folder />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    // enzyme doesn't support React.createContext
    it.skip('renders a h3 with folder name when in props', () => {
        const props = {
        match: {
            params: {
            noteId: 'test-note-id'
            }
        }
        }
        const context = {
        notes: [{ id: 'test-note-id', folderId: 'test-folder-id' }],
        folders: [{ id: 'test-folder-id', name: 'Important' }]
        }

        const h3 = shallow(<NotePageNav {...props} />, context)
        .find('.NotePageNav__folder-name')
        expect(toJson(h3)).toMatchSnapshot()
    })
})