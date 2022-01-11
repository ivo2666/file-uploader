import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

export class FileUploader extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        maxFileSize={5000000}
        />
    )
  }
}