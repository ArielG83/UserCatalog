import React from 'react'
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-elements';
import UserCell from './UserCell'
import { colors } from '../../utils/constants'
import WithUser from '../../HOC/WithUser'

const UsersCatalog = ({ actions, navigation, users }) => {

    const renderCell = ({ item, index }) => {
        return <UserCell 
                    user={item} 
                    openUserPage={()=>{navigation.navigate('UserPage', item)}}
                    editUserPage={() => {navigation.navigate('AddEditPage', {...item, userIndex:index})}}
                />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    title="New User"
                    onPress={()=>navigation.navigate('AddEditPage', {})}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    titleStyle={styles.btnLabel}
                    type="outline"
                />
                <Button
                    title="Random"
                    onPress={actions.createRandomUser}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    titleStyle={styles.btnLabel}
                    type="outline"
                />
            </View>
            <View style={styles.main}>
                { users && users.length > 0 ? 
                    <View style={styles.listWrap}>
                        <FlatList
                            data={users}
                            renderItem={renderCell}
                            keyExtractor={item => item.id}
                        /> 
                    </View>
                    : <View style={styles.placeholder}>
                        <Text style={styles.placeholderLabel}>Please add a user using the options above</Text>
                        <ActivityIndicator size="large" color={colors.grey} />
                    </View>
                }
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
    },
    header:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnContainer:{
        flex: 1,
        padding: 20,
    },
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 5,
        backgroundColor: colors.lightGrey,
    },
    btnLabel:{
        color: colors.black,
    },
    main:{
        flex:7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listWrap:{
        flex:1,
        width:'100%',
    },
    placeholder:{
        flex: 1,
        justifyContent: 'center',
        color: colors.grey,
    },
    placeholderLabel:{
        fontSize: 20,
        margin: 10,
    }
})

export default WithUser(UsersCatalog)