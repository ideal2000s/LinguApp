import React from 'react';
import styled from 'styled-components';
import ListSelectorItem from './ListSelectorItem';
import { ILanguage } from 'students/stores/user';
import { useKeydownScroll } from './hooks';

interface IProps {
  items: ILanguage[];
  selected: ILanguage | null;
  onSelectedChange: (lang: ILanguage) => void;
}
const ListSelector: React.FC<IProps> = ({ items, selected, onSelectedChange }) => {
  const refs = useKeydownScroll(items);

  function selectItemHandler(item: ILanguage) {
    onSelectedChange(item);
  }

  return (
    <ItemsList>
      {items.map((item) => (
        <ListSelectorItem
          key={item.id}
          value={item}
          label={item.systemName}
          checked={selected?.id === item.id}
          onSelect={selectItemHandler}
          ref={refs[item.id]}
        />
      ))}
    </ItemsList>
  );
};

export default ListSelector;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;
