import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Editor = ({value, onChange}) => {
  document.addEventListener('DOMContentLoaded', () => {
    // You can define it before replacing the editor
    CKEditor.on('instanceReady', function (e) {
      // Do your bindings / other actions here
      // To access the editor that this event has fired on:
      const editor = e.editor
    })
  })

  return (<>
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onReady={editor => {
        // You can store the “editor” and use when it is needed.
        // console.log('Editor is ready to use!', editor)
      }}

      onChange={(event, editor) => {
        const newData = editor.getData()
        onChange(newData)
      }}

      onFocus={(event, editor) => {
      }}

      onBlur={(event, editor) => {
      }}

    />
  </>)
}

export default Editor
