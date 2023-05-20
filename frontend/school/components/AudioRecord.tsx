import React from 'react';
import axios from 'axios';
import { AudioRecorder } from './audio/AudioRecorder';

type tProps = {
  item?: any;
};

type tState = {
  record: Blob | null;
};

export default class AudioRecord extends React.Component<tProps, tState> {
  constructor(props: tProps) {
    super(props);
    this.state = { record: null };
  }

  handleRecorder = (record: Blob | null) => {
    record &&
      this.setState({ record }, () => {
        this.handleSubmit();
      });
  };

  handleSubmit = () => {
    const audio_data = this.state.record;
    const item = this.props.item;
    const data = new FormData();
    const audio_element = $('#comment_audio');

    data.append('_method', 'patch');
    if (audio_data === null) {
      audio_element.val('');
    } else {
      const upload_cache_data = new FormData();
      upload_cache_data.append(
        'files[]',
        audio_data,
        `school-comment-audio-${item.id}.mp3`
      );

      axios.post('/upload', upload_cache_data).then((result) => {
        audio_element.val(JSON.stringify(result.data.data));
      });
    }
  };

  render() {
    return <AudioRecorder onRecordChange={this.handleRecorder} />;
  }
}
