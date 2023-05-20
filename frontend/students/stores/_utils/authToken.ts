import axios from 'axios';

export function updateAuthTokens({ csrf }: { csrf?: string; jwt?: string }) {
  if (csrf) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
  }
}

interface IFederatedAuthData {
  type: string;
  authenticity_token: string;
  jwt_token: string;
}
export function listenFederatedAuthMessage(cb?: () => void) {
  function listener(e: MessageEvent<IFederatedAuthData>) {
    const {
      origin,
      data: { type, authenticity_token }
    } = e;

    if (origin !== location.origin) {
      return;
    }
    if (type !== 'oauth_callback') return;
    updateAuthTokens({ csrf: authenticity_token });
    cb?.();
  }
  window.addEventListener('message', listener);
}
