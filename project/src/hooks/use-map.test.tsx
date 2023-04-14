import { renderHook } from '@testing-library/react';
import { makeFakeCity } from '../common/mocks';
import useMap from './use-map';

const fakeCity = makeFakeCity();

describe('Hook: useMap', () => {

  it('should return array with 2 elements', () => {

    const mapElement = document.createElement('div');
    document.body.appendChild(mapElement);

    const mapRef = {
      current: mapElement,
    };

    const { result } = renderHook(() =>
      useMap(mapRef, fakeCity),
    );

    const [map, layerGroup] = result.current;

    expect(result.current).toHaveLength(2);
    expect(map).toBeInstanceOf(Object);
    expect(layerGroup).toBeInstanceOf(Object);

  });

});
