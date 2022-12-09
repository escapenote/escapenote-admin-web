import React from 'react';

interface IProps {
  width?: string;
  height?: string;
  color?: string;
}

const IconDropdown: React.FC<IProps> = ({ width = '16', height = '16', color = 'gray' }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <path
      d="M12.2929 5.3335C12.7122 5.3335 12.9453 5.81846 12.6834 6.14584L8.39035 11.5121C8.19019 11.7623 7.80965 11.7623 7.60948 11.5121L3.31646 6.14584C3.05456 5.81846 3.28764 5.3335 3.7069 5.3335L12.2929 5.3335Z"
      fill={color}
    />
  </svg>
);

export default IconDropdown;
