import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { tStudentTargetLanguage } from 'students/models';
import { Translate } from 'i18n';

import level0Icon from 'students/views/screens/StudentOnboarding/assets/levels/0-level.svg';
import level0ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/0-level-color.svg';

import level1Icon from 'students/views/screens/StudentOnboarding/assets/levels/1-level.svg';
import level1ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/1-level-color.svg';

import level2Icon from 'students/views/screens/StudentOnboarding/assets/levels/2-level.svg';
import level2ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/2-level-color.svg';

import level3Icon from 'students/views/screens/StudentOnboarding/assets/levels/3-level.svg';
import level3ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/3-level-color.svg';

import level4Icon from 'students/views/screens/StudentOnboarding/assets/levels/4-level.svg';
import level4ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/4-level-color.svg';

import level5Icon from 'students/views/screens/StudentOnboarding/assets/levels/5-level.svg';
import level5ColorIcon from 'students/views/screens/StudentOnboarding/assets/levels/5-level-color.svg';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { SNoStyleButton } from 'students/views/shared/styled';

interface IProps {
  level: tStudentTargetLanguage['level'];
  selected: boolean;
  onSelect: (level: tStudentTargetLanguage['level']) => void;
}
const SelectTargetLevelItem: React.FC<IProps> = ({ level, selected, onSelect }) => {
  const itemLevel = levelsData.get(level);
  if (!itemLevel) return null;

  function clickHandler() {
    onSelect(level);
  }

  const iconUrl = selected ? itemLevel.colorIcon : itemLevel.icon;

  return (
    <SLevelRadioButton className={cn({ checked: selected })} onClick={clickHandler}>
      <SIconBlock>
        <UrlIcon url={iconUrl} width="50px" height="50px" />
      </SIconBlock>
      <SShortNameBlock>{itemLevel?.levelShortName}</SShortNameBlock>
      <SFullNameBlock>
        <Translate str={itemLevel?.nameLocaleStr} />
      </SFullNameBlock>
    </SLevelRadioButton>
  );
};

export default SelectTargetLevelItem;

const SLevelRadioButton = styled(SNoStyleButton)`
  display: flex;
  align-items: center;
  height: 70px;
  color: #ffffffcc;

  &:not(:last-child) {
    border-bottom: solid 1px #ffffff80;
  }

  &:focus {
    outline: none;
    outline-color: transparent;
  }

  &:hover,
  &:focus {
    background: linear-gradient(180deg, #ffffff44 0%, #ffffff22 100%);
  }

  &.checked {
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
    color: #2d2d3acc;
  }
`;

const SIconBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 70px;
`;

const SShortNameBlock = styled.div`
  width: 25px;
  font-weight: 600;
  font-size: 1.125rem;
  margin-right: 5px;
  text-align: left;
`;

const SFullNameBlock = styled.div`
  letter-spacing: -0.02em;
  max-width: calc(100% - 100px);
  overflow: hidden;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const levelsData = new Map<
  tStudentTargetLanguage['level'],
  {
    value: tStudentTargetLanguage['level'];
    levelShortName: string;
    nameLocaleStr: string;
    icon: string;
    colorIcon: string;
  }
>([
  [
    'zero_level',
    {
      value: 'zero_level',
      levelShortName: '0',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.no_knowledge',
      icon: level0Icon,
      colorIcon: level0ColorIcon
    }
  ],
  [
    'a1',
    {
      value: 'a1',
      levelShortName: 'A1',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.a1',
      icon: level1Icon,
      colorIcon: level1ColorIcon
    }
  ],
  [
    'a2',
    {
      value: 'a2',
      levelShortName: 'A2',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.a2',
      icon: level2Icon,
      colorIcon: level2ColorIcon
    }
  ],
  [
    'b1',
    {
      value: 'b1',
      levelShortName: 'B1',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.b1',
      icon: level3Icon,
      colorIcon: level3ColorIcon
    }
  ],
  [
    'b2',
    {
      value: 'b2',
      levelShortName: 'B2',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.b2',
      icon: level4Icon,
      colorIcon: level4ColorIcon
    }
  ],
  [
    'c1',
    {
      value: 'c1',
      levelShortName: 'C1',
      nameLocaleStr: 'frontend.profile.onboarding.language_levels.c1',
      icon: level5Icon,
      colorIcon: level5ColorIcon
    }
  ]
]);
