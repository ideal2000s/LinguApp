import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { SRootStyle } from 'students/views/shared/styled';

// Extract _user-variables sass variables into a JS object
export const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../../../theme/scss/_user-variables.scss');
// console.log('THEME VARS: ', theme);

function withSRootStyle<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
): FC<P> {
  const hocComponent: FC<P> = ({ ...props }) => (
    <ThemeProvider theme={theme}>
      <SRootStyle>
        <WrappedComponent {...props} />
      </SRootStyle>
    </ThemeProvider>
  );

  return hocComponent;
}

export default withSRootStyle;
