import { useCallback, useEffect, useRef, useState } from 'react';
import { SortMenuItems } from '../../common/constants';

type OffersSortingMenuProps = {
  onChangeSortType: (sortType: SortMenuItems) => void;
};

function OffersSortingMenu({ onChangeSortType }: OffersSortingMenuProps): JSX.Element {

  const sortMenuButtonRef = useRef(null);
  const [menuShow, setMenuShow] = useState(false);
  const [activeItem, setActiveItem] = useState(SortMenuItems.Default);

  useEffect(() => {
    if (!sortMenuButtonRef) {
      return;
    }
    const closeMenu = (e: MouseEvent) => {
      if (e.target !== sortMenuButtonRef.current) {
        setMenuShow(false);
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => document.body.removeEventListener('click', closeMenu);
  }, [menuShow]);

  const handleChangeActiveItem = useCallback((newActiveItem: SortMenuItems) => {
    setActiveItem(newActiveItem);

    if (onChangeSortType) {
      onChangeSortType(newActiveItem);
    }
  }, [onChangeSortType]);

  const menuItems = Object.values(SortMenuItems).map((item, i) => (
    <li
      key={`places__option_${String(i)}`}
      className={`places__option ${item === activeItem ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => handleChangeActiveItem(item)}
    >
      {item}
    </li>));

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by &nbsp;</span>
      <span role="button" className="places__sorting-type" tabIndex={0} onClick={() => setMenuShow(!menuShow)} ref={sortMenuButtonRef}>
        {activeItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul role="menu" className={`places__options places__options--custom ${menuShow ? 'places__options--opened' : ''}`}>
        {menuItems}
      </ul>

    </form>
  );
}

export default OffersSortingMenu;
