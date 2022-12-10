import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { HomeFilled } from '@ant-design/icons';

interface IProps {
  addressLine?: string;
  lat?: number;
  lng?: number;
}
const SimpleMap: React.FC<IProps> = ({ addressLine, lat, lng }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: location,
      zoom: 9,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [lat, lng]);

  return <div ref={mapElement} style={{ minHeight: '300px' }} />;
};

interface IMarkerProps {
  lat: number;
  lng: number;
  onClick: () => void;
}
const Marker: React.FC<IMarkerProps> = ({ onClick }) => {
  return (
    <Circle onClick={onClick}>
      <HomeFilled style={{ fontSize: '22px', color: 'white' }} />
    </Circle>
  );
};

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: -22px;
  width: 44px;
  height: 44px;
  padding: 8px;
  background-color: rgb(var(--primary));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export default SimpleMap;
