import React from 'react';
import cn from 'classnames';
import PageWithBg from 'students/views/shared/components/PageWithBg';
import Navbar from 'students/views/shared/components/Navbar';
import { SPageContainer } from 'students/views/shared/styled';
import { isLightFontNeeded } from 'students/views/shared/helpers';

export interface IPage {
  background?: string;
  gradient?: string;
  bgImage?: string;
  bgSize?: string;
  style?: React.CSSProperties;
  hasNavbar?: boolean;
  className?: string;
  noPadding?: boolean;
}

const Page: React.FC<IPage> = ({
  children,
  background,
  gradient,
  bgImage,
  bgSize,
  hasNavbar,
  style,
  className,
  noPadding
}) => {
  const isLightFont = isLightFontNeeded(background);

  return (
    <PageWithBg
      gradient={gradient}
      solidColor={background}
      bgImage={bgImage}
      bgSize={bgSize}
      style={style}
    >
      {!!hasNavbar && <Navbar darkBurger={!isLightFont} />}

      <SPageContainer className={cn(className)} noPadding={noPadding}>
        {children}
      </SPageContainer>
    </PageWithBg>
  );
};

export default Page;
