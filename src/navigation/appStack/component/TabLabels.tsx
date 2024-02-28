import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {perfectSize} from '../../../utils/mixins';
import {COLORS} from '../../../utils/colors';
import DeviceInfo from 'react-native-device-info';

interface TabLabelsProps {
  focused: boolean;
  routName: string;
  position: string;
}

const TabLabels: React.FC<TabLabelsProps> = ({
  focused = false,
  routName = '',
  position = '',
}) => {
  const isTablet = DeviceInfo.isTablet();

  const styles = dynamicStyles(focused);
  return (
    <Text
      style={[
        styles.container,
        {
          marginLeft: position === 'beside-icon' ? perfectSize(15) : 0,
          marginTop: position === 'beside-icon' ? perfectSize(2) : 0,
          marginBottom: isTablet
            ? position === 'beside-icon'
              ? 0
              : perfectSize(10)
            : 0,
        },
      ]}>
      {routName}
    </Text>
  );
};

export default TabLabels;

const dynamicStyles = (focused: boolean) => {
  return StyleSheet.create({
    container: {
      color: COLORS.BLACK,
    },
  });
};
