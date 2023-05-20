import $ from 'jquery';

window.fillTaskAudioDuration = function () {
  document.getElementById('task_audio_duration').value =
    parseInt(document.querySelector('audio.preview').duration)
}

$(document).on('submit', 'form.js-fill-audio-duration', () => {
	fillTaskAudioDuration();
});