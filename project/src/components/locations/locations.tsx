import { useCallback } from 'react';
import { Cities } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/main-data/main-data';
import { getCurrentCity } from '../../store/main-data/selectors';
import LocationTabItem from '../location-tab-item/location-tab-item';

function Locations(): JSX.Element {

  const dispatch = useAppDispatch();

  const selectedCityTab = useAppSelector(getCurrentCity);

  const handleChangeCity = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, city: Cities) => {
      e.preventDefault();
      dispatch(setCity(Cities[city]));
    },
    [dispatch],
  );

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {Object.values(Cities).map((city) => (
            <LocationTabItem
              city={city}
              key={city}
              isActive={selectedCityTab === city}
              onChangeCurrentLocation={handleChangeCity}
            />))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
