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
    Alert
} from 'react-native';
import { API_URL } from "../../api/axiosConfig"
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import axios from 'axios';




const EditUserScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const [editUser, setUser] = useState({
        name: '',
        password: '',
        role: 'user',
        id: ''
    });

    const onChangeText = (e) => {
        setUser(prev => {
            return {
                ...prev,
                'name': e
            }
        })
    }

    const onChangeTextEmail = (e) => {
        setUser(prev => {
            return {
                ...prev,
                'email': e
            }
        })
    }

    const onChangeTextPassword = (e) => {
        setUser(prev => {
            return {
                ...prev,
                'password': e
            }
        })
    }

    const setRoleUser = () => {
        setUser(prev => {
            return {
                ...prev,
                'role': "user"
            }
        })
    }
    const setRoleAdmin = () => {
        setUser(prev => {
            return {
                ...prev,
                'role': "admin"
            }
        })

    }

    useEffect(() => {
        setUser({
            name: data[0],
            password: '',
            role: data[2],
            id: data[3]
        })
    }, [data])


    const editUserPress = async() => {
        const tokenApp = await AsyncStorage.getItem("tokenapp");
        const tokenHeader = `Bearer ${tokenApp}`;
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization =  tokenHeader;
            return config;
        });
        try {
         await axios.put(`${API_URL}users/edit`, editUser);
         Toast.show('Sửa tài khoản thành công', Toast.LONG);
        } catch (error) {
            Toast.show('Email đã tồn tại trong hệ thống', Toast.LONG);
        }
    }
    return (
        <View>
            <Text style={styles.title}> Sửa tài khoản</Text>
            <View>
                <Text style={styles.title}> Tên người dùng : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={editUser.name}
                    placeholder="Name"
                    placeholderTextColor="green"
                />
            </View>
            <View>
                <Text style={styles.title}> Email : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextEmail}
                    value={data[1]}
                    editable={false}
                    placeholder="Email"
                    placeholderTextColor="green"
                />
            </View>
            <View>
                <Text style={styles.title}> Mật khẩu mới : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextPassword}
                    value={editUser.password}
                    placeholder="Password"
                    placeholderTextColor="green"
                />
            </View>
            <View style={styles.radio}>
                <Text style={styles.titleRole}> Quyền người dùng : </Text>
                <View style={styles.flexRadio}>

                    <RadioButton
                        value={editUser.role}
                        status={editUser.role === 'user' ? 'checked' : 'unchecked'}
                        onPress={setRoleUser}
                    // style={styles.radio}
                    />
                    <Text style={styles.titleRadio}> User </Text>
                </View>
                <View style={styles.flexRadio}>

                    <RadioButton
                        value={editUser.role}
                        status={editUser.role === 'admin' ? 'checked' : 'unchecked'}
                        onPress={setRoleAdmin}
                    // style={styles.radio}
                    />
                    <Text style={styles.titleRadio}> Admin </Text>
                </View>
            </View>


            <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={editUserPress}>
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}>
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Sửa thông tin tài khoản
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EditUserScreen;

const styles = StyleSheet.create({
    titleRole: { color: '#009385', fontSize: 15, paddingTop: 30, paddingLeft: 0 },
    title: { color: '#009385', fontSize: 15, paddingTop: 30, paddingLeft: 30 },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 30,
        marginHorizontal: 30
    },
    radio: {
        paddingHorizontal: 30
    },
    flexRadio: {
        flexDirection: 'row'
    },
    titleRadio: {
        fontSize: 16,
        color: '#009385',
        marginTop: 5
    },

    signIn: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 30,
        marginTop: 20
    }
});