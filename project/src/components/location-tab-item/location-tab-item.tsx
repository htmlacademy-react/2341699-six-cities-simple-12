import { Cities } from '../../common/constants';

type LocationTabItemProps = {
  city: Cities;
  isActive: boolean;
  changeCurrentLocation: (e: React.MouseEvent<HTMLAnchorElement>, city: Cities) => void;
};

function LocationTabItem({ city, isActive, changeCurrentLocation }: LocationTabItemProps): JSX.Element {

  const classLink = isActive ? 'tabs__item--active' : '';

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${classLink}`} href={'/'} onClick={(e) => changeCurrentLocation(e, city)}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationTabItem;
