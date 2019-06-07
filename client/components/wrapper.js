import React, {Component} from 'react'
import Dropzone from './dropzone'

class wrapper extends Component {
  render() {
    return (
      <div className="Card">
        <Dropzone onFilesAdded={console.log} />
      </div>
    )
  }
}

export default wrapper
