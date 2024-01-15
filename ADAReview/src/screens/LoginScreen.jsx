import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { login } from '../API/user';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';
import { LoginStyles } from '../styles/styles';
import { errorHandling } from "../error/errorHandling";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
    return () => {
      backHandler.remove();
    };
  }, []);

    const APILogin = async () => {
      if(username === "" || password === "") {
        Alert.alert("Veuillez remplir tous les champs");
      }
      else {
        setIsLoading(true);
        try {
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);
          const token = await login(formData);
          if (token !== undefined) {
            dispatch(setToken(token));
            navigation.navigate('MenuBar');
            
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            Alert.alert('Erreur : identifiants incorrects.');
          }else{
            const errorMsg = errorHandling(error);
            Alert.alert(errorMsg);
          }
        }
        finally {
          setPassword('');
          setUsername('');
          setIsLoading(false);
        }
      }
    };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleBackPress = () => {
    Alert.alert(
      "Quitter l'application",
      "Êtes-vous sûr de vouloir quitter l'application ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Quitter", onPress: () => BackHandler.exitApp() }
      ]
    );
    return true;
  };
  return (
    <>
      <View style={LoginStyles.container}>
        {isLoading ? (
          // Affichage du spinner de chargement en cas de chargement en cours
          <View style={LoginStyles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          // Affichage du contenu du formulaire lorsqu'il n'y a pas de chargement en cours
          <>
            <Text style={LoginStyles.title}>ADA {"\n"} REVIEW</Text>
            <View style={LoginStyles.rectangleContainer}>
              <View style={LoginStyles.inputView}>
                <TextInput
                  style={LoginStyles.TextInput}
                  placeholder="USERNAME"
                  placeholderTextColor="#6F6F6F"
                  onChangeText={(username) => setUsername(username)}
                  returnKeyType="next"
                />
              </View>
              <View style={LoginStyles.inputView}>
                <TextInput
                  style={LoginStyles.TextInput}
                  placeholder="PASSWORD"
                  placeholderTextColor="#6F6F6F"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  returnKeyType="done"
                />
              </View>
              <TouchableOpacity onPress={APILogin} style={LoginStyles.loginBtn}>
                <Text style={LoginStyles.loginText}>CONNECT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={LoginStyles.registerText}>No account? Register!</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleBackPress} style={LoginStyles.backButton}>
              <Text style={LoginStyles.backText}>←</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}