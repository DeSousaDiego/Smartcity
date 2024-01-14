import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ListItem } from 'react-native-elements';
import BackButton from '../components/BackButton';
import { useSelector } from 'react-redux';
import { addReview } from '../store/reviewSlice';
import { countriesList } from '../components/CountriesList';
import { sendFormRegister } from '../API/user';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { Switch } from 'react-native';
import { addUser } from '../store/userSlice';
import { styles } from '../styles/styles';
import SelectDropdown from 'react-native-select-dropdown';
import { errorHandling } from '../error/errorHandling';


function RegisterScreen(){
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState(countriesList[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newsletter, setNewsletter] = useState(false);


    const submitUser = () => {
        if(username !== '' && 
            password !== '' && 
            passwordConfirm !== '' &&
            email !== '' && 
            country !== ''){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Veuillez saisir une adresse e-mail valide');
                return;
            }

            const phoneRegex = /^[0-9]{10}$/; 
            if (phoneNumber && !phoneRegex.test(phoneNumber)) {
                Alert.alert('Veuillez saisir un numéro de téléphone valide');
                return;
            }
            if(password !== passwordConfirm){
                Alert.alert('Les mots de passe ne correspondent pas');
                return;
            }
            const user = {
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
                try{
                    sendFormRegister(JSON.stringify(user));
                    dispatch(addUser(user));
                    navigation.navigate('Login');
                }
                catch(error){
                    const errorMsg = errorHandling(errorMsg);
                    Alert.alert(errorMsg);
                }
          }else{
            Alert.alert('Veuillez remplir tous les champs');
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
              NEW USER
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
                    <Text>Username* :</Text>
                    <TextInput
                    maxLength={33}
                    onChangeText={(text) => setUsername(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Password* :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Password confirmation* :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Email* :</Text>
                    <TextInput
                    maxLength={33}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="done"
                    />
                </View>

                <View>
                    <Text>Country* :</Text>
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
                    />
                </View>

                <View>
                    <Text>Phone number :</Text>
                    <TextInput
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
                onPress={submitUser}
                style={{
                  backgroundColor: '#354F52',
                  borderRadius: 8,
                  paddingVertical: 12,
                  marginTop: 20,
                  width: '100%',
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
                  Ajouter
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAwareScrollView>
        </>
      );
}

export default RegisterScreen;