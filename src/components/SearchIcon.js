import {Line, Svg, Circle} from 'react-native-svg';
import React from 'react';

const SearchIcon = () => {
  return (
    <Svg
      class="feather feather-search"
      fill="none"
      height="40"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="40"
      color="black"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" x2="16.65" y1="21" y2="16.65" />
    </Svg>
  );
};
export default SearchIcon;
