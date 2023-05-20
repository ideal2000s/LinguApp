import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

type IProps = {
  resource: string;
};

const OtpChecker: React.FC<IProps> = ({ resource }) => {
  const [code, setCode] = useState('');

  const onChangeHandler = (code: string) => {
    setCode(code);

    if (code.length !== 6) {
      return;
    }

    $(`#edit_${resource}`).find(`#${resource}_password`).val(code).end().submit();
  };

  return (
    <OtpInput
      containerStyle="otp-container"
      inputStyle="otp-input"
      focusStyle="otp-focus"
      disabledStyle="otp-disabled"
      errorStyle="otp-error"
      value={code}
      onChange={onChangeHandler}
      numInputs={6}
      isInputNum
      shouldAutoFocus
    />
  );
};

export default OtpChecker;
