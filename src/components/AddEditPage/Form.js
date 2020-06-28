import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { colors } from '../../utils/constants';
import { debounce, isEmpty } from '../../utils/general';
import DatePicker from './DatePicker';
import ProfileImage from './ProfileImage';

const Form = ({ user, submit }) => {
  const isNew = isEmpty(user);
  const [fullName, setFullName] = useState(!isNew ? user.fullName : '');
  const [email, setEmail] = useState(!isNew ? user.email : '');
  const [profileImage, setProfileImage] = useState(
    !isNew ? user.profileImage : '',
  );
  const [birthDate, setBirthDate] = useState(!isNew ? user.birthDate : null);
  const [gender, setGender] = useState(!isNew ? user.gender : '');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [profileImageError, setProfileImageError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');

  const uploadProfileImage = (image) => {
    setProfileImage(image);
    setProfileImageError(false);
  };

  const updateBirthDate = (date) => {
    setBirthDate(date);
    setBirthDateError(false);
  };

  const validateName = (value) => {
    setFullName(value);

    if (!value || value === '') {
      setFullNameError('Invalid Name');
    } else {
      setFullNameError('');
    }
  };

  const validateEmail = (value) => {
    setEmail(value);

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value && value !== '' && !regex.test(String(value).toLowerCase())) {
      setEmailError('Invalid Email');
    } else {
      setEmailError('');
    }
  };

  const validate = () => {
    let valid = true;
    setValidationErrorMsg('');

    if (!fullName || fullName === '' || fullNameError !== '') {
      valid = false;
      setFullNameError('Invalid Name');
    }

    if (!email || email === '' || emailError !== '') {
      valid = false;
      setEmailError('Invalid Email');
    }

    if (!profileImage || profileImage === '' || profileImageError) {
      valid = false;
      setValidationErrorMsg('Please upload profile image');
      setProfileImageError(true);
    }

    if (!birthDate || birthDate === '' || birthDateError) {
      valid = false;
      setValidationErrorMsg('Please select birth date');
      setBirthDateError(true);
    }

    if (!gender || gender === '' || genderError) {
      valid = false;
      setGenderError(true);
      setValidationErrorMsg('Please select gender');
    }

    return valid;
  };

  const save = () => {
    if (validate()) {
      const existingUser = isNew ? {} : user;
      submit({
        ...existingUser,
        fullName,
        email,
        profileImage,
        birthDate,
        gender,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <ProfileImage
          profileImage={profileImage}
          upload={uploadProfileImage}
          error={profileImageError}
        />
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Full Name"
          inputContainerStyle={{
            ...styles.textInput,
            borderColor: fullNameError === '' ? colors.grey : colors.red,
          }}
          onChangeText={(value) => debounce(validateName(value), 500)}
          value={fullName}
          errorMessage={fullNameError}
        />
        <Input
          placeholder="Email Address"
          inputContainerStyle={{
            ...styles.textInput,
            borderColor: emailError === '' ? colors.grey : colors.red,
          }}
          onChangeText={(value) => debounce(validateEmail(value), 500)}
          value={email}
          errorMessage={emailError}
        />
        <DatePicker
          birthDate={birthDate}
          updateBirthDate={updateBirthDate}
          error={birthDateError}
        />
        <View style={styles.genderWrap}>
          <CheckBox
            center
            title="Male"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={gender === 'male'}
            onPress={() => setGender('male')}
            checkedColor={genderError ? colors.red : colors.black}
            containerStyle={styles.checkBoxContainer}
          />
          <CheckBox
            center
            title="Female"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={gender === 'female'}
            onPress={() => setGender('female')}
            checkedColor={colors.black}
            uncheckedColor={genderError ? colors.red : colors.lightGrey}
            containerStyle={styles.checkBoxContainer}
          />
        </View>
        <View style={styles.submitWrap}>
          <Text style={styles.validationError}>
            {validationErrorMsg && `* ${validationErrorMsg}`}
          </Text>
          <Button
            title="Save"
            onPress={save}
            buttonStyle={styles.btn}
            titleStyle={styles.btnLabel}
            type="outline"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  imageWrap: {
    minHeight: 200,
  },
  form: {
    flex: 4,
    width: '100%',
    justifyContent: 'flex-start',
  },
  textInput: {
    borderColor: colors.grey,
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 5,
  },
  genderWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  submitWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  validationError: {
    color: colors.red,
    padding: 10,
    textAlign: 'left',
    width: '100%',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 5,
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 50,
  },
  btnLabel: {
    color: colors.black,
  },
});

export default Form;
