import { SafeAreaView } from "react-native";
import React from "react";
import AccountDetails from "../components/AccountDetails";
import { getActiveUser } from "../API/user";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { errorHandling } from "../error/errorHandling";


function AccountScreen (){
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.users.users);
    const [account, setAccount] = useState(null);

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
    }, [user]);

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