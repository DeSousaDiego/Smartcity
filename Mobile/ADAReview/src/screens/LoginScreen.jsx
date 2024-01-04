// import { fetchBookData } from '../store/dataBaseLoader';
// import { login } from '../API/user';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { login } from '../API/user';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  
    const APILogin = async () => {
      try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const token = (await login(formData)).token;
        if (token !== undefined) {
          dispatch(setToken(token));
          // await fetchBookData(dispatch, token);
          navigation.navigate('MenuBar');
          
        } else {
          Alert.alert('Wrong username or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Server error');
      }
    };

  const handleRegisterPress = () => {
    // Action à effectuer lors du clic sur le lien de l'enregistrement
    // Dans cet exemple, nous faisons apparaître un message temporaire.
    setShowMessage(true);
    // Vous pouvez ajouter d'autres actions ici, comme la navigation vers une autre vue.
  };
  const handleBackPress = () => {
    // Action à effectuer lors du clic sur la flèche de retour
    // Dans cet exemple, nous faisons disparaître le message.
    setShowMessage(false);

    // Vous pouvez ajouter d'autres actions ici, comme la navigation vers l'écran précédent.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADA {"\n"} Review</Text>
      <View style={styles.rectangleContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="USERNAME"
            placeholderTextColor="#6F6F6F"
            onChangeText={(username) => setUsername(username)}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="PASSWORD"
            placeholderTextColor="#6F6F6F"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity onPress={APILogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>CONNECT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerText}>No account? Register!</Text>
        </TouchableOpacity>
        {showMessage && <Text style={styles.messageText}>On va vers la page register</Text>}
      </View>

      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F52",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 10.80,
  },
  rectangleContainer: {
    backgroundColor: "#354F52",
    shadowColor: "black",
    shadowOpacity: 0.5,
    width: "80%",
    padding: 20,
    alignItems: "center",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    minHeight: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 50,
    display: 'flex',
    padding: 10,
  },
  registerText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#D9D9D9",
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },

  backText: {
    color: 'blue',
    fontSize: 20,
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 50,
  },
});