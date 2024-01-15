import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../components/BackButton';
import { useSelector } from 'react-redux';
import { countriesList } from '../components/CountriesList';
import { updateUser as updateUserAPI } from '../API/user';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { Switch } from 'react-native';
import { updateUser } from '../store/userSlice';
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import { userFormStyles } from '../styles/styles';
import { errorHandling } from '../error/errorHandling';



function ModifyAccountScreen({ route }){
    const { account } = route.params;
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
    const [image, setImage] = useState(null);


    const ModifyUser = () => {
        if(username !== '' && 
            email !== '' && 
            country !== '' &&  
            password !== '' &&
            passwordConfirm !== ''
            ){
            if(password === passwordConfirm){


                let fileName = image ? image.split('/').pop() : null;
                let match = /\.(\w+)$/.exec(fileName);
                let type = match ? `image/${match[1]}` : `image`;

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
                  img_path: fileName,
              }

                let formData = new FormData();
                formData.append("id", account.id);
                formData.append('username', username);
                formData.append('email_address', email);
                formData.append('password', password);
                formData.append('password2', passwordConfirm);
                formData.append('role', account.role);
                formData.append('country', country);
                formData.append('phone_number', phoneNumber);
                formData.append('news_letter', newsletter);
                formData.append('image', (image?  {uri: image, name: fileName, type} : null));
                try{
                    updateUserAPI(formData, token);
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

      const addImage= async()=>{

        let image = await ImagePicker.launchImageLibraryAsync({
          type: {'file': 'image/jpeg'},
          allowsEditing: true,
          aspect: [4,3]
        });
        if (!image.canceled) {     
          setImage(image.assets[0].uri);
        }
      };

      return (
        <>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#354F52',
              paddingTop: 40,
              paddingBottom: 20,
              paddingHorizontal: 10,
            }}
          >
            <BackButton navigation={navigation} color="white" />
            <Text
              style={userFormStyles.title}
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
                  <View style={userFormStyles.imageUploaderContainer}>
                  {
                      image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                  }
                      <View style={userFormStyles.uploadBtnContainer}>
                          <TouchableOpacity onPress={addImage} style={userFormStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
        
                <View style ={userFormStyles.inputContainer}>
                    <Text style={userFormStyles.labelText}>Username* :</Text>
                    <TextInput
                    value={username}
                    maxLength={33}
                    onChangeText={(text) => setUsername(text)}
                    returnKeyType="done"
                    style={userFormStyles.textInput}
                    />
                </View>

                <View style ={userFormStyles.inputContainer}>
                    <Text style={userFormStyles.labelText}>Password* :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="done"
                    style={userFormStyles.textInput}
                    />
                </View>

                <View style ={userFormStyles.inputContainer}>
                    <Text style={userFormStyles.labelText}>Password confirmation* :</Text>
                    <TextInput
                    maxLength={33}
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    returnKeyType="done"
                    style={userFormStyles.textInput}
                    />
                </View>

                <View  style ={userFormStyles.inputContainer}>
                    <Text style={userFormStyles.labelText}>Email* :</Text>
                    <TextInput
                    value={email}
                    maxLength={33}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="done"
                    style={userFormStyles.textInput}
                    />
                </View>

                <View style ={userFormStyles.inputContainer}>
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
                        defaultValue={country}
                        style={userFormStyles.dropdown}
                    />
                </View>

                <View  style ={userFormStyles.inputContainer}>
                    <Text style={userFormStyles.labelText}>Phone number :</Text>
                    <TextInput
                    value={phoneNumber}
                    maxLength={33}
                    onChangeText={(text) => setPhoneNumber(text)}
                    returnKeyType="done"
                    style={userFormStyles.textInput}
                    />
                </View>

                <View style={userFormStyles.switchContainer}>
                    <Switch
                    value={newsletter}
                    onValueChange={() => setNewsletter(!newsletter)}
                    />
                    <Text>Newsletter :</Text>
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