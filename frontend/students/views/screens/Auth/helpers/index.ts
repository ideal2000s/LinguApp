import { IAuth } from 'students/models';

import socials from './socials';

function getTextForVariant(
  isSignUp: IAuth['modal']['isSignUp']
): { footerQuestion: string; footer: string; header: string } {
  if (isSignUp) {
    return {
      header: 'frontend.auth.join_lingu',
      footer: 'frontend.auth.sign_in',
      footerQuestion: 'frontend.auth.already_have_acc_question'
    };
  }
  return {
    header: 'frontend.auth.sign_in',
    footer: 'frontend.auth.sign_up',
    footerQuestion: 'frontend.auth.no_account_question'
  };
}

export { getTextForVariant, socials };
