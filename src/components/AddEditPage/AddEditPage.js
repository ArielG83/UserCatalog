import React from 'react';
import {
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Icon, Button } from 'react-native-elements'
import { colors } from '../../utils/constants'
import { isEmpty } from '../../utils/general'
import WithUser from '../../HOC/WithUser'
import Form from './Form'

const AddEditPage = ({route, navigation, actions}) => {

    const closePage = () => { 
        navigation.dispatch(StackActions.pop(1))
    }

    const deleteUser = () => {
        if(!isEmpty(route.params)) {
            const { userIndex } = route.params
            actions.deleteUser(userIndex)
        }
        closePage()
    }

    const submit = user => {
        if(!isEmpty(route.params)){
            actions.updateUser(user)
        }else{
            actions.createUser(user)
        }
        closePage()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    title="Back"
                    onPress={closePage}
                    buttonStyle={styles.btn}
                    titleStyle={styles.btnLabel}
                    type="outline"
                />
                <TouchableOpacity onPress={deleteUser} style={styles.delete}>
                    <Icon 
                        name='delete' 
                        color={colors.black}
                        type='material'
                    />
                </TouchableOpacity>
            </View>

            <View  style={styles.main}>
                <Form  user={route.params} submit={submit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: colors.white,
        minHeight: 50,
    },
    header:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 5,
        backgroundColor: colors.lightGrey,
        paddingHorizontal: 20,
    },
    btnLabel:{
        color: colors.black,
    },
    main:{
        flex:7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
})

export default WithUser(AddEditPage)