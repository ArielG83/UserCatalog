import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/constants';
import { isEmpty } from '../../utils/general';

const UserCell = ({
  user,
  openUserPage,
  editUserPage,
  selectUserAction,
  selectUser,
}) => {
  const { fullName, email, profileImage, id, matchScore } = user;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={openUserPage}>
            <Icon name="remove-red-eye" color={colors.black} type="material" />
          </TouchableOpacity>
          <TouchableOpacity onPress={editUserPage}>
            <Icon name="edit" color={colors.black} type="material" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrap}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity
          style={styles.matchingWrap}
          disabled={!isEmpty(selectUser) && id === selectUser.id}
          onPress={selectUserAction}>
          <Icon
            name="favorite"
            color={
              !isEmpty(selectUser) && id === selectUser.id
                ? colors.grey
                : matchScore >= 0
                ? colors.red
                : colors.black
            }
            type="material"
            size={75}
          />
          {matchScore >= 0 && (
            <Text style={styles.matchScoreText}>{`${matchScore}%`}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  inner: {
    flex: 1,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
  },
  nav: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    padding: 5,
  },
  imageWrap: {
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    borderWidth: 2,
    borderColor: colors.grey,
    width: 128,
    height: 128,
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    color: colors.black,
  },
  email: {
    fontSize: 16,
    color: colors.black,
  },
  matchingWrap: {
    position: 'absolute',
    zIndex: 5,
    top: 5,
    left: 5,
    width: 80,
    height: 80,
    padding: 5,
  },
  matchScoreText: {
    position: 'absolute',
    zIndex: 10,
    top: 30,
    left: 33,
    color: colors.white,
  },
});

export default UserCell;
