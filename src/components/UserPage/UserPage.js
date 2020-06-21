import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment'
import { StackActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/constants'

const UserPage = ({route, navigation}) => {
    const { fullName, email, profileImage, birthDate, matchScore} = route.params

    const parsedDate = moment(birthDate).format('DD/MM/YYYY')

    const closePage = ()=>{navigation.dispatch(StackActions.pop(1))}

    return (
        <TouchableOpacity onPress={closePage} style={styles.container}>
            <View  style={styles.inner}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={closePage} style={styles.close}>
                        <Icon 
                            name='cancel' 
                            color={colors.black}
                            type='material'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageWrap}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage}/>
                    { matchScore >= 0 && <Text style={styles.matchLabel}>{`${matchScore}% Match`}</Text>}
                </View>
                <View style={styles.details}>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.birthDate}>{parsedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: "center",
        backgroundColor: 'transparent',
        padding:20,
        zIndex: 10,
    },
    inner:{
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 5,
        width:'100%',
        overflow: 'hidden',
        backgroundColor: colors.white
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
    close:{
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
    matchLabel:{
        paddingTop:5,
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
    },
    birthDate:{
        fontSize: 16,
        color: colors.black,
    }
})

export default UserPage