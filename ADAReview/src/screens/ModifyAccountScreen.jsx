import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ListItem } from 'react-native-elements';
import BackButton from '../components/BackButton';
import { useSelector } from 'react-redux';
import { addReview } from '../store/reviewSlice';
import { countriesList } from '../components/CountriesList';
import { updateUser as updateUserAPI } from '../API/user';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { Switch } from 'react-native';
import { addUser } from '../store/userSlice';
import { styles } from '../styles/styles';
import { errorHandling } from '../error/errorHandling';
import { updateUser } from '../store/userSlice';
import SelectDropdown from 'react-native-select-dropdown'


function ModifyAccountScreen({ route }){
    const { account } = route.params;
    console.log("account ACCOUNT: ", account);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [username, setUsername] = useState(account.username);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState(account.email_address);
    const [country, setCountry] = useState(account.country);
    const [phoneNumber, setPhoneNumber] = useState(account.phone_number);
    const [newsletter, setNewsletter] = useState(account.news_letter);


    const ModifyUser = () => {
        // formData = new FormData();
        // formData.append('username', username);
        // formData.append('email_address', email);
        // formData.append('password', password);
        // formData.append('role', 'user');
        // formData.append('country', country);
        // formData.append('phone_number', phoneNumber);
        // formData.append('news_letter', newsletter);
        // formData.append('img_path', null);
        if(username !== '' && 
            email !== '' && 
            country !== '' &&  
            password !== '' &&
            passwordConfirm !== ''
            ){
            if(password === passwordConfirm){
                const user = {
                    id: account.id,
                    username: username,
                    email_address: email,
                    password: password,
                    password2: passwordConfirm,
                    role: 'user',
                    country: country,
                    phone_number: phoneNumber,
                    news_letter: newsletter,
                    image: null
                }
                console.log("user: ", user);
                try{
                    updateUserAPI(JSON.stringify(user), token);
                    dispatch(updateUser(user));
                  navigation.navigate('Account');
                }
                catch(error){
                    const errorMsg = errorHandling(errorMsg);
                    Alert.alert(errorMsg);
                }
            }else{
                Alert.alert('Les mots de passe ne correspondent pas');
            }
        }else{
            Alert.alert('Veuillez remplir tous les champs obligatoires');
        }

      };

      return (
        <>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#CFCFC1',
              paddingTop: 40,
              paddingBottom: 20,
              paddingHorizontal: 10,
            }}
          >
            <BackButton navigation={navigation} color="#354F52" />
            <Text
              style={{
                flex: 1,
                color: '#354F52',
                fontSize: 28,
                fontFamily: 'Oswald_700Bold',
                textAlign: 'center',
              }}
            >
              MODIFY
            </Text>
          </SafeAreaView>
    
          <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <ScrollView
              contentContainerStyle={{
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <View>
                    {/* ------ PUT A IMAGE INPUT HERE ------ */}
                </View>
        
                <View>
                    <Text>Username :</Text>
                    <TextInput
                    value={username}
                    maxLength={33}
                    onChangeText={(text) => setUsername(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Password :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Password confirmation :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Email :</Text>
                    <TextInput
                    value={email}
                    maxLength={33}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Country :</Text>
                    <SelectDropdown
                        data={countriesList}
                        onSelect={(selectedItem, index) => {
                            setCountry(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        defaultValue={country}
                    />
                </View>

                <View>
                    <Text>Phone number :</Text>
                    <TextInput
                    value={phoneNumber}
                    maxLength={33}
                    onChangeText={(text) => setPhoneNumber(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Newsletter :</Text>
                    <Switch
                    value={newsletter}
                    onValueChange={() => setNewsletter(!newsletter)}
                    />
                </View>
    
              <TouchableOpacity
                onPress={ModifyUser}
                style={{
                  backgroundColor: '#354F52',
                  borderRadius: 8,
                  paddingVertical: 12,
                  marginTop: 20,
                  width: '100%',
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
                  Modify
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAwareScrollView>
        </>
      );
}

export default ModifyAccountScreen;