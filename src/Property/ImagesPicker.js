import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

export default function ImagesPicker (props) {
  const { setImgFiles, setImgRefs } = props

  useEffect(() => {
    const fileButton = document.getElementById('fileButton')
    fileButton.addEventListener('change', function (e) {
      const files = fileButton.files
      setImgFiles(files)
      const urls = []
      Array.prototype.forEach.call(files, (file) => {
        const url = window.URL.createObjectURL(file).toString()
        urls.push(url)
      })

      setImgRefs(urls)
    })

    return () => {
      fileButton.removeEventListener('mouseover', () => {})
    }
  })

  return (
    <>
      <label htmlFor="fileButton">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>

      <input
        data-cy="images-picker"
        hidden="hidden"
        accept="image/*"
        id="fileButton"
        type="file"
        multiple
      />

      <progress id="progressBar" value="0" max="100">
        {' '}
      </progress>
    </>
  )
}

ImagesPicker.propTypes = {
  setImgFiles: PropTypes.func.isRequired,
  setImgRefs: PropTypes.func.isRequired
}
