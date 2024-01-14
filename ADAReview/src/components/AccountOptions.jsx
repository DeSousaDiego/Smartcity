import { SafeAreaView, View } from "react-native";
import React from "react";
import { getActiveUser, logout } from "../API/user";
import { useSelector } from 'react-redux';
import { Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import {deleteUser as deleteUserAPI} from "../API/user";
import { deleteUser } from "../store/userSlice";
import { clearToken } from "../store/authSlice";
import { errorHandling } from "../error/errorHandling";
import { Menu, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';


function AccountOptions (){
    const token = useSelector(state => state.auth.token);
    const [account, setAccount] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();  
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
  
    const showMenu = () => setVisible(true);
    useEffect(() => {
        async function fetchAccount() {
            try{
            const accountData = await getActiveUser(token);
            setAccount(accountData);
            }
            catch(error){
                const errorMsg = errorHandling(error);
                Alert.alert(errorMsg);
            }
        }

        fetchAccount();
    }, [token]);

    const deleteUser = async() => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }, 
                {
                    text: "OK", 
                    onPress: async () => {
                        console.log("OK Pressed");
                        try{
                            const response = await deleteUserAPI(account.id, token);
                            if(response.status === 204){
                                dispatch(deleteUser(account.id));
                                clearToken();
                                navigation.push('Login');
                                
                            }
                            else{
                                Alert.alert('Server error');
                            }
                        } catch (error) {
                            Alert.alert('Server error');
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    }

    const handleLogout = async () => {
        try {
            const response = await logout(token); // Assuming logoutAPI is the function to log the user out
            if(response.status === 200) {                    
                clearToken();
                navigation.navigate('Login');
            }
        }catch (error) {
            if (error instanceof Error) {
                console.error('Error during logout:', error);
            } else {
                console.error('Error during logout: An unknown error occurred');
            }
            Alert.alert('Server error');
        }
    }
    
    return(
        <>   
        <SafeAreaView>
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Menu
                        visible={visible}
                        anchor={<Icon name="settings-outline" size={30} color={'white'}  onPress={showMenu}/>}
                        onRequestClose={hideMenu}>

                        <MenuItem 
                            onPress={() => navigation.navigate('Modify', { account: account })}                        
                            style={{
                                backgroundColor: 'white',
                                paddingVertical: 12
                            }}
                            ><Text style={{color:'#354F52'}}>Modify</Text></MenuItem>

                        <MenuItem 
                            onPress={() => deleteUser()}                        
                            style={{
                                backgroundColor: 'white',
                                paddingVertical: 12
                            }}
                            ><Text style={{color:'#354F52'}}>Delete</Text></MenuItem>

                        <MenuItem 
                            onPress={() => handleLogout()}                        
                            style={{
                                backgroundColor: 'white',
                                paddingVertical: 12
                            }}
                            ><Text style={{color:'#354F52'}}>Logout</Text></MenuItem>
                    </Menu>
                    </View>
                </>
        </SafeAreaView>
        </>
    );
}

export default AccountOptions;