import GLogo from 'students/views/shared/assets/g-logo.png';
import FBLogo from 'students/views/shared/assets/fb-logo.png';
import MSLogo from 'students/views/shared/assets/ms-logo.png';

import GLogoWebp from 'students/views/shared/assets/g-logo.webp';
import FBLogoWebp from 'students/views/shared/assets/fb-logo.webp';
import MSLogoWebp from 'students/views/shared/assets/ms-logo.webp';

const socials: {
  link: string;
  providerName: string;
  logo: string;
  fallbackLogo: string;
}[] = [
  {
    link: '/auth/google_student',
    providerName: 'Google',
    logo: GLogoWebp,
    fallbackLogo: GLogo
  },
  {
    link: '/auth/facebook_student',
    providerName: 'Facebook',
    logo: FBLogoWebp,
    fallbackLogo: FBLogo
  },
  {
    link: '/auth/microsoft_student',
    providerName: 'Microsoft',
    logo: MSLogoWebp,
    fallbackLogo: MSLogo
  }
];

export default socials;
