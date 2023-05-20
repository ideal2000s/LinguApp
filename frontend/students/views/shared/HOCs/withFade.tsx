import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const FadedDiv = styled.div<{ duration: number }>`
  opacity: 0;
  transition: opacity ${(props) => props.duration}ms;

  &.fadeIn {
    opacity: 1;
  }
`;

export function withFade2<P extends Record<string, any>>({
  duration = 1000,
  className = ''
} = {}): (wrappedComponent: React.ComponentType<P>) => FC<P | any> {
  return (WrappedComponent: React.ComponentType<P>) => {
    const HocComponent: FC<P> = ({ ...props }) => {
      const [fadeIn, setFadeIn] = useState(false);

      useEffect(() => {
        // hack for rendering first without fadeIn class
        const timer = window.setTimeout(() => {
          setFadeIn(true);
        }, 100);

        return () => {
          clearTimeout(timer);
          setFadeIn(false);
        };
      }, []);
      return (
        <FadedDiv duration={duration} className={cn({ fadeIn }, className)}>
          <WrappedComponent {...props} />
        </FadedDiv>
      );
    };
    return HocComponent;
  };
}

export function withFade<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
): FC<P> {
  const HocComponent: FC<P> = ({ ...props }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
      setFadeIn(true);
      return () => {
        setFadeIn(false);
      };
    }, []);
    return (
      <FadedDiv duration={1200} className={cn({ fadeIn })}>
        <WrappedComponent {...props} />
      </FadedDiv>
    );
  };

  return HocComponent;
}
