import { ILearnVideoTask } from 'students/models';

const learnVideoTaskMock: ILearnVideoTask = {
  id: 4381,
  lessonId: 315,
  type: 'Tasks::Video',
  subject: 'teach',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  mobileImageURL: null,
  title: 'Video',
  introduction: '',
  giphyImage: null,
  items: [
    {
      id: 8110,
      type: 'TaskItems::Video',
      url: 'https://www.youtube.com/watch?v=90PgFUPIybY',
      caption:
        '<div class="trix-content">\n  <div class="trix-content">\n  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>\n</div>\n</div>\n'
    }
  ],
  url: '/api/lessons/315/tasks/4381'
};

export default learnVideoTaskMock;
