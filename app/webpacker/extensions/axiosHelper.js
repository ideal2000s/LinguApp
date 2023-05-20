import Rails from '@rails/ujs';
import axios from 'axios';

axios.defaults.headers.common['X-CSRF-TOKEN'] = Rails.csrfToken();
