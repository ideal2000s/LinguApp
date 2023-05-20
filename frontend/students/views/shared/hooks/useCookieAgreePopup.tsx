import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../helpers';

const COOKIE_NAME = '_use_cookies';
const DAYS_TO_EXPIRE = 365;

function useCookieAgreePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkIfCookieExists = () => {
      if (getCookie(COOKIE_NAME) !== 'true') {
        setTimeout(() => {
          setShow(true);
        }, 1500);
      }
    };

    checkIfCookieExists();
  }, []);

  const handleAgreeClick = () => {
    setCookie(COOKIE_NAME, 'true', DAYS_TO_EXPIRE);
    setShow(false);
  };

  return [show, handleAgreeClick];
}

export default useCookieAgreePopup;
