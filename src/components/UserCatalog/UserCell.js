import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/constants'

const UserCell = ({user, openUserPage, editUserPage}) => {
    const { fullName, email, profileImage} = user

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={openUserPage}>
                        <Icon 
                            name='remove-red-eye' 
                            color={colors.black}
                            type='material'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={editUserPage}>
                        <Icon 
                            name='edit' 
                            color={colors.black}
                            type='material'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageWrap}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage}/>
                </View>
                <View style={styles.details}>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: "center",
        backgroundColor: colors.white,
        padding:20,
    },
    inner:{
        flex:1,
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 5,
        width:'100%',
        overflow: 'hidden'
    },
    nav:{
        position: "absolute",
        zIndex: 5,
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        padding: 5,
    },
    imageWrap:{
        backgroundColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
    },
    profileImage: {
        borderWidth: 2,
        borderColor: colors.grey,
        width: 128,
        height: 128,
    },
    details:{
        padding: 15,
    },
    name:{
        fontSize: 24,
        color: colors.black,
    },
    email:{
        fontSize: 16,
        color: colors.black,
    }
})

export default UserCell