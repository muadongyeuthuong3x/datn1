import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StatusBar,
    Button,
    Alert
} from 'react-native';
import { API_URL } from "../../api/axiosConfig"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const ListUserScreen = ({ navigation }) => {

    const [listUser, setListUser] = useState([]);
    const [callApi, setCallApi] = useState(false)
    useEffect(() => {
        const callApiGetList = async () => {
            try {
                const tokenApp = await AsyncStorage.getItem("tokenapp");
                const tokenHeader = `Bearer ${tokenApp}`;
                const response = await axios.get(`${API_URL}users`, { headers: { Authorization: tokenHeader } });
                const dataPush = [];
                const dataRes = response.data;
                dataRes.map(e => {
                    dataPush.push([
                        e.name,
                        e.email,
                        e.role,
                        e.id,
                        e.id
                    ])
                })
                setListUser(dataPush)
            } catch (error) {
                console.log(error)
            }
        }
        callApiGetList()
    }, [callApi])


    const showAlertDelete = (id) => {
        Alert.alert(
            'Bạn chắc chắn xóa user này chứ',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        const tokenApp = await AsyncStorage.getItem("tokenapp");
                        const tokenHeader = `Bearer ${tokenApp}`;
                        await axios.delete(`${API_URL}users/${id}`, { headers: { Authorization: tokenHeader } });
                        setCallApi(!callApi)
                        Toast.show('Xóa tài khoản thành công', Toast.LONG);
                    }
                },
            ]
        );
    }



    const tableHead = ['Tên', 'Email', 'Role', 'Sửa', 'Xóa']
    const element = (data) => (
        <TouchableOpacity onPress={() => showAlertDelete(data)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>Xóa</Text>
            </View>
        </TouchableOpacity>
    );

    const elementEdit = (data) => (
        <TouchableOpacity onPress={() => navigatorEditUser(data)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>Sửa</Text>
            </View>
        </TouchableOpacity>
    );

    const navigatorUser = () => {
        navigation.navigate('CreateUser');
    }

    const navigatorEditUser = (item) => {
        navigation.navigate('EditUser', {
            data: item,
        });
    }


    const [emailSearch, setEmailSearch] = useState('')
    const searchData = async () => {
        const tokenApp = await AsyncStorage.getItem("tokenapp");
        const tokenHeader = `Bearer ${tokenApp}`;
        const dataPush = [];
        const response = await axios.post(`${API_URL}users/search`, { email: emailSearch }, { headers: { Authorization: tokenHeader } });
        const dataRes = response.data;
        dataRes.map(e => {
            dataPush.push([
                e.name,
                e.email,
                e.role,
                e.id,
                e.id
            ])
        })
        setListUser(dataPush)
    }
    return (
        <View style={styles.container}>
           

            <View style={styles.actionView}>

            <Button
                onPress={navigatorUser}
                title="Tạo user"
                color= '#05375a'
                width="10%"
                height= '20'
                style={{textAlign: 'center' , justifyContent: 'center'}}
            />

                <TextInput
                    placeholder="Search email"
                    placeholderTextColor="green"
                    style={[
                        styles.textInputView,
                    ]}
                    autoCapitalize="none"
                    onChangeText={val => setEmailSearch(val)}
                    value={emailSearch}
                />
                <Button
                    onPress={searchData}
                    style={{textAlign: 'center' , justifyContent: 'center'}}
                    title="Search"
                    color= '#05375a'
                    width="10%"
                />
            </View>


            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                {
                    listUser.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, cellIndex) : ((cellIndex === 3) ? elementEdit(rowData) : cellData)} textStyle={styles.text} />
                                ))

                            }
                        </TableWrapper>
                    ))
                }
            </Table>
        </View>
    )
}



export default ListUserScreen;

const styles = StyleSheet.create({
    actionView :{
        flexDirection: 'row', 
        paddingBottom: 20
    },
    textInputView :{
        width: '50%',
        marginHorizontal: '5%',
        borderColor:'red',
        borderWidth:1,
        borderRadius:10,
        
    },

    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

