import React from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import avatarImg from 'students/views/shared/assets/avatar.svg';
import { IProfile } from 'students/models';

interface IProps {
  image?: string;
  user: Partial<IProfile>;
  responsive?: boolean;
  mirror?: boolean;
  className?: string;
}
const UserAvatar: React.FC<IProps> = ({
  image = avatarImg,
  user,
  responsive = true,
  mirror,
  className
}) => {
  if (!user) return null;

  const { fname, lname } = user;
  const name = `${fname} ${lname}`;
  return (
    <article
      className={cn({ 'd-flex align-items-center flex-row-reverse': mirror }, className)}
    >
      <SName className={cn({ 'd-none d-md-inline': responsive, mirror: mirror })}>
        {name}
      </SName>

      <SImage loading="lazy" src={image} roundedCircle alt={name} />
    </article>
  );
};

export default UserAvatar;

const SName = styled.span`
  margin-left: 1rem;
  margin-right: 0.8rem;
  vertical-align: middle;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.625rem;
  color: #2d2d3a;
`;

const SImage = styled(Image)`
  object-fit: contain;
  max-height: 2rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    max-height: 2.5rem;
  }
`;
