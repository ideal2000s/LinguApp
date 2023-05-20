import { useSelector } from 'react-redux';
import { userSelectors } from 'students/stores/user';
import { requestingSelectors } from 'students/stores/requesting';

export default function useAuthenticated(): boolean {
  const profileRequesting = useSelector(requestingSelectors.selectProfileRequesting);
  const selectedProfile = useSelector(userSelectors.selectProfile);

  return profileRequesting || Boolean(selectedProfile);
}
