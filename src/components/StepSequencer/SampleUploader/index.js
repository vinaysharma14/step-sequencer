import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './style.css';
import { inject, observer } from 'mobx-react';

class SampleUploader extends Component {
  constructor(props) {
    super(props);
    this.handleSampleUpload = this.handleSampleUpload.bind(this);
    this.uploadedSample = React.createRef();
  }

  handleSampleUpload() {
    const { handleSampleUpload } = this.props.store.stepSequencerStore;
    this.getBase64(this.uploadedSample.current.files[0], base64 => {
      handleSampleUpload({ name: this.uploadedSample.current.files[0].name, base64 });
    });
  }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="sample-uploader">
        <input
          type="file"
          id="file"
          ref={this.uploadedSample}
          onChange={this.handleSampleUpload}
          accept="audio/wav"
          className="hidden"
        />
        <label htmlFor="file" className="input-sample">
          <FontAwesomeIcon
            icon={faPlus}
            className="sample-preview"
          />
        </label>
      </div>
    )
  }
}

export default inject('store')(observer(SampleUploader));