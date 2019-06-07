import React, {Component} from 'react'

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hightlight: false
    }
    this.fileInputRef = React.createRef()
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }
  openFileDialog() {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }
  fileListToArray(list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }
  onFilesAdded(evt) {
    if (this.props.disabled) return
    const files = evt.target.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }
  // setting the hightlight-state to true in case the component is not disbaled
  onDragOver(evt) {
    evt.preventDefault()

    if (this.props.disabled) return

    this.setState({hightlight: true})
  }
  //setting the highlight state to false
  onDragLeave() {
    this.setState({hightlight: false})
  }
  // if a file is dragged onto fileup were calling onFilesAdded and setting the higlight state to false
  onDrop(event) {
    event.preventDefault()

    if (this.props.disabled) return

    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({hightlight: false})
  }
  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? 'Hightlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{cursor: this.props.disabled ? 'default' : 'pointer'}}
      >
        <img alt="upload" className="Icon" src="file-upload.png" />
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <span>Upload CSV Files</span>
      </div>
    )
  }
}

export default Dropzone
