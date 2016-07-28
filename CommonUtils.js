'use strict';
import React, { Component } from 'React';
import {
  Dimensions,
} from 'react-native';

export const getWindowWidth = () => {
  return Dimensions.get('window').width;
}

'use strict';

export const parseDateFromYYYYMMdd = (str) => {
  if (!str) return new Date();
  return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
}