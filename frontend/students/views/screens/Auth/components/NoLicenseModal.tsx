import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { SRootStyle } from 'students/views/shared/styled';
import { withLinguModal } from 'students/views/shared/components/LinguModal';

const price = 'NOK 1890';

const NoLicenseModal: React.FC = () => {
  return (
    <div>
      <SRootStyle>
        <Modal.Body>
          <SBody>
            <SHeader>
              <Translate str="frontend.course.need_to_buy_course" />
            </SHeader>
            <SText>
              <Translate str="frontend.course.sign_up_with_lingu_for" />
              {` ${price} `}
              <Translate str="frontend.course.per_month" />
            </SText>
            <SLinkButton href="https://lingu.no/contact-us" role="button">
              Book now
            </SLinkButton>
          </SBody>
        </Modal.Body>
      </SRootStyle>
    </div>
  );
};

export default withLinguModal('noLicenseModal', {
  preventDefaultModalStyles: true
})(NoLicenseModal);

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SHeader = styled.h1`
  font-family: Encode Sans;
  font-weight: bold;
  color: #2d2d3a;
  text-align: center;
  font-size: 1.75rem;
  line-height: 2.25rem;
`;

const SText = styled.p`
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.375rem;
  letter-spacing: -0.02em;
  color: #5e5d71;
`;

const SLinkButton = styled.a`
  min-height: 3.5rem;
  padding: 1rem;
  background: #00a5d7;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1.125rem;
  line-height: 1.375rem;
  font-family: Encode Sans;
  font-weight: 600;
  min-width: 20rem;
  text-align: center;

  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;
