import React, { FC, ReactNode, CSSProperties } from 'react';
import { Sticky, StickyProps, StickyChildArgs } from 'react-sticky';

interface IStickyHeader {
  children: (props: StickyChildArgs) => ReactNode;
  options?: Omit<StickyProps, 'children'>;
  stickyStyles?: CSSProperties;
}

const StickyHeader: FC<IStickyHeader> = ({ children, options, stickyStyles }) => (
  <Sticky disableCompensation {...options}>
    {({
      style,
      isSticky,
      distanceFromTop,
      distanceFromBottom,
      calculatedHeight
    }: StickyChildArgs) => (
      <div style={{ ...style, left: 0, width: '100%', zIndex: 1, ...stickyStyles }}>
        {children({
          style,
          isSticky,
          distanceFromTop,
          distanceFromBottom,
          calculatedHeight
        } as StickyChildArgs)}
      </div>
    )}
  </Sticky>
);

export default StickyHeader;
