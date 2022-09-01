import React from 'react'
import { useParams } from 'react-router-dom'

const ImagePage = () => {
    const { imageId } = useParams();
  return (
    <div>ImagePage - {imageId}</div>
  )
}

export default ImagePage