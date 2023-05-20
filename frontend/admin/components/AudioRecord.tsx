import React from 'react';
import axios from 'axios';
import AudioRecorder from 'admin/components/audio/AudioRecorder';

type tProps = {
  item?: any;
  api: string;
  modal?: string;
  upload_mode?: number;
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
    const audio_element =
      $('#task_items_container #task_item_audio').length > 0
        ? $('#task_items_container #task_item_audio')
        : $('#dictionary_word_audio');

    data.append('_method', 'patch');
    if (audio_data === null) {
      if (this.props.upload_mode === 1) {
        audio_element.val('');
      } else {
        data.append('task_item[audio]', '');
        axios.post(this.props.api, data);
      }
    } else {
      const upload_cache_data = new FormData();
      upload_cache_data.append('files[]', audio_data, `audio-${item.id}.mp3`);

      axios.post('/upload', upload_cache_data).then((result) => {
        if (this.props.upload_mode === 1) {
          audio_element.val(JSON.stringify(result.data.data));
          if (audio_element.attr('id') === 'dictionary_word_audio')
            $('#phrase_audio_upload').val('');
        } else {
          data.append('task_item[audio]', JSON.stringify(result.data.data));
          axios.post(this.props.api, data);
        }
      });
    }
  };

  render() {
    return (
      <div>
        <AudioRecorder onRecordChange={this.handleRecorder} />
      </div>
    );
  }
}
