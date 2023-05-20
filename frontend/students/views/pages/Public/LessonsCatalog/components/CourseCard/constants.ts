import desktopBackground1 from '../../../assets/course_cards/desktop_background_1.svg';
import desktopBackground2 from '../../../assets/course_cards/desktop_background_2.svg';
import desktopBackground3 from '../../../assets/course_cards/desktop_background_3.svg';
import desktopBackground4 from '../../../assets/course_cards/desktop_background_4.svg';
import mobileBackground1 from '../../../assets/course_cards/mobile_background_1.svg';
import mobileBackground2 from '../../../assets/course_cards/mobile_background_2.svg';
import mobileBackground3 from '../../../assets/course_cards/mobile_background_3.svg';
import mobileBackground4 from '../../../assets/course_cards/mobile_background_4.svg';

export const STYLES_COLOR_MAP = [
  {
    color: '#00a5d7',
    gradient: 'linear-gradient(95.74deg, #00BCE8 0.64%, #0082B2 99.16%)',
    desktop: {
      transform: 'rotate(-15deg) translate(90.5%, 55%)',
      background: desktopBackground1,
      position: 'left: unset; bottom: 0; right: -2rem;',
      width: '538px',
      imageWidth: '345px',
      imageHeight: '224px'
    },
    tablet: {
      transform: 'rotate(-9.7deg) translate(9.6%, -44%)',
      position: 'left: unset; bottom: 0; right: -2rem;'
    },
    mobile: {
      transform: 'rotate(-9.7deg) translate(12.6%, -37%)',
      background: mobileBackground1
    }
  },
  {
    color: '#8dc63f',
    gradient: 'linear-gradient(98.36deg, #9ECF4F -19.97%, #1CAE30 99.19%)',
    desktop: {
      transform: 'rotate(12.3deg) translate(75.5%, 14.5%)',
      background: desktopBackground2,
      position: 'left: unset; bottom: 0; right: -8px;',
      width: '480px',
      imageWidth: '345px',
      imageHeight: '224px'
    },
    tablet: {
      transform: 'rotate(11.5deg) translate(26%, -31%)',
      position: 'left: unset; bottom: 0; right: -68px;'
    },
    mobile: {
      transform: 'rotate(11.5deg) translate(43%, -36%)',
      background: mobileBackground2
    }
  },
  {
    color: '#ef4036',
    gradient: 'linear-gradient(95.74deg, #FE6E5F 0.64%, #F53F2B 99.16%) ',
    desktop: {
      transform: 'rotate(-10.8deg) translate(78%, 28%)',
      background: desktopBackground3,
      position: 'left: unset; bottom: 0; right: -149px;',
      width: '621px',
      imageWidth: '348px',
      imageHeight: '231px'
    },
    tablet: {
      transform: 'rotate(-11deg) translate(33%,-27%)',
      position: 'left: unset; bottom: 0; right: -209px;'
    },
    mobile: {
      transform: 'rotate(-11deg) translate(48%, -23%)',
      background: mobileBackground3
    }
  },
  {
    color: '#8371ce',
    gradient: 'linear-gradient(95.74deg, #7F59C5 0.64%, #453780 99.16%, #453780 99.16%)',
    desktop: {
      transform: 'rotate(-6deg) translate(105%, 20%)',
      background: desktopBackground4,
      position: 'left: unset; bottom: 0; right: -178px;',
      width: '650px',
      imageWidth: '296px',
      imageHeight: '232px'
    },
    tablet: {
      transform: 'rotate(6.8deg) translate(24%, -43%)',
      position: 'left: unset; bottom: 0; right: -238px;'
    },
    mobile: {
      transform: 'rotate(6.8deg) translate(38%, -42%)',
      background: mobileBackground4
    }
  }
];
