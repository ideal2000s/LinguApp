export interface IAuth {
  modal: {
    show: boolean;
    isSignUp: boolean;
  };
  tempUser: {
    email: string;
    fname?: string;
    lname?: string;
    marketingConsent?: boolean;
  } | null;
}

export interface IStudentMailSignUpRequest {
  student: {
    email: string;
    fname: string;
    lname: string;
    marketingConsent: boolean;
    password: string;
  };
}

export interface IStudentVerifyOTP {
  student: {
    email: string;
    fname?: string;
    lname?: string;
    marketingConsent?: boolean;
  };
}

export type tStudentMailSignUpErrors = {
  fname?: string[];
  lname?: string[];
  email?: string[];
} | null;

export interface IStudentMailSignInRequest {
  student: {
    email: string;
    password: string;
  };
}
