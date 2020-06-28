import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/constants';
import ImagePicker from 'react-native-image-picker';

const ImageUpload = ({ profileImage, upload, error }) => {
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        upload(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {profileImage === '' ? (
        <View
          style={{
            ...styles.profileImage,
            borderColor: error ? colors.red : colors.grey,
          }}>
          <Icon name="person" color={colors.black} type="material" size={128} />
        </View>
      ) : (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <TouchableOpacity onPress={uploadImage} style={styles.uploadImage}>
        <Icon name="backup" color={colors.black} type="material" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginVertical: 20,
    backgroundColor: colors.lightGrey,
  },
  profileImage: {
    borderWidth: 2,
    borderColor: colors.grey,
    width: 128,
    height: 128,
    backgroundColor: colors.white,
  },
  uploadImage: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
});

export default ImageUpload;
