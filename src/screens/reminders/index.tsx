import React from 'react'
import { Text, View, StyleSheet, Alert, BackHandler, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppHeader from '../../components/appHeader'
import colors from '../../utils/constants/colors'
import { reminders, IReminder } from '../../DummyData'
import { navigate } from '../../routes/rootNavigation'

const Home = () => {

    const render_note_item = (item: IReminder) => {
        return (
            <View style={styles.noteView}>
                <Text style={styles.textTitle}>{item.note.title}</Text>
                <Text style={styles.textContent}>{item.note.content.split("\n")[0]}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10}}>
                    <TouchableOpacity style={styles.timeView}>
                        <Icon name='notifications-outline' size={18} color='black' />
                        <Text style={{marginLeft:5}}>{item.time.toString()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AppHeader title="Reminder" />
            <View>
                <FlatList
                    data={reminders}
                    renderItem={({ item }) => render_note_item(item)}
                    keyExtractor={item => item.reminder_id}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnAddStyle: {
        backgroundColor: '#cccccc',
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        right: 30,
        bottom: 30
    },
    noteView: {
        height: 120,
        backgroundColor: "#ececec",
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        paddingLeft: 20
    },
    textTitle: {
        fontSize: 22,
    },
    textContent: {
        fontSize: 17,
        color: 'gray'
    },
    titleView: {
        flexDirection: 'row',
    },
    timeView: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor:'#cccccc',
        flexDirection:'row'
    }
})
