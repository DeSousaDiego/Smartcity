import { SafeAreaView, View } from "react-native";
import React from "react";
import AccountDetails from "../components/AccountDetails";
import { getActiveUser } from "../API/user";
import { useSelector } from 'react-redux';
import { Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {deleteUser as deleteUserAPI} from "../API/user";
import { deleteUser } from "../store/userSlice";
import { clearToken } from "../store/authSlice";
import { errorHandling } from "../error/errorHandling";


function AccountScreen (){
    const token = useSelector(state => state.auth.token);
    const [account, setAccount] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
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

    return(
        <SafeAreaView>
            {(account !== null ?
                <>
                    {account && <AccountDetails account={account} isMainAccount={true}/>}
                </>
            : 
            <ActivityIndicator size="large" color="#0000ff" />
            )}

        </SafeAreaView>
    );
}
export default AccountScreen;