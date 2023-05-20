import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18n';

import { mockEnLocale, mockBgLocale } from './__mocks__/LangSwitcherMock';
import LangSwitcher, { ILocaleOption } from '../LangSwitcher';

describe('<LangSwitcher />', () => {
  const onChangeHandler = jest.fn((locale: ILocaleOption) => locale);
  const currentOption = mockEnLocale;

  beforeEach(() => {
    render(<LangSwitcher onChange={onChangeHandler} />);
  });

  it('Component should contain current locale', async () => {
    expect(screen.getByText(t(currentOption.labelKey))).toBeInTheDocument();
  });

  it('Component should change locale after user select', async () => {
    const langSelectBtn = screen.getByText(t(currentOption.labelKey));
    userEvent.click(langSelectBtn);

    expect(screen.getByText(t(mockBgLocale.labelKey))).toBeInTheDocument();

    const bgLangBtn = screen.getByText(t(mockBgLocale.labelKey));
    userEvent.click(bgLangBtn);

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(mockBgLocale);
  });
});
