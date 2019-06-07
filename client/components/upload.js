import React, {Component} from 'react'
import wrapper from './wrapper'
import Dropzone from './dropzone'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class upload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      uploading: false,
      successfullUploaded: false
    }

    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
    this.renderActions = this.renderActions.bind(this)
  }
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }))
  }
  async uploadFiles() {
    this.setState({uploading: true})

    const promises = []
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file))
    })
    try {
      await Promise.all(promises)

      this.setState({successfullUploaded: true, uploading: false})
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({successfullUploaded: true, uploading: false})
    }
  }
  sendRequest(file) {
    console.log('this method is getting called')
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()

      const formData = new FormData()
      formData.append('file', file, file.name)

      req.open('POST', 'http://localhost:8080/upload')
      req.send(formData)
    })
  }
  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() => this.setState({files: [], successfullUploaded: false})}
        >
          Clear
        </button>
      )
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      )
    }
  }

  render() {
    return (
      <div className="upload">
        <div className="directons">
          Click the icon to select your file or drag and drop from your file
          system.
        </div>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploaded || this.state.successfulUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {/* {this.renderProgress(file)} */}
                </div>
              )
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    )
  }
}

export default upload
