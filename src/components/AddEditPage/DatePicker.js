import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Button } from 'react-native-elements';
import { colors } from '../../utils/constants';

const DatePicker = ({ birthDate, updateBirthDate, error }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, date) => {
    const { type } = event;
    setShowDatePicker(false);
    if (typeof date !== 'undefined' && type === 'set') {
      updateBirthDate(date);
    }
  };

  const onPress = () => {
    if (!showDatePicker) {
      setShowDatePicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{'Date of Birth:'}</Text>
      <View>
        <Button
          title={
            birthDate
              ? moment(birthDate).format('DD/MM/YYYY')
              : 'Select date of birth'
          }
          onPress={onPress}
          buttonStyle={{
            ...styles.btn,
            borderColor: error ? colors.red : colors.grey,
          }}
          titleStyle={styles.btnLabel}
          type="outline"
          disabled={showDatePicker}
        />
        <View style={styles.icon}>
          <Icon
            name="date-range"
            color={colors.black}
            type="material"
            size={20}
          />
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate ? birthDate : new Date()}
          display="calendar"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    paddingVertical: 10,
  },
  btn: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 10,
  },
  btnLabel: {
    color: colors.black,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default DatePicker;
