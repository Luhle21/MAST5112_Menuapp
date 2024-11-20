import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Button, TextInput, Alert } from "react-native";
import assets from 'assets';
import { Pressable } from "react-native-gesture-handler";
import { Link } from "expo-router";

const CHEF_PASSWORD = "Chef123"; //password for chef to use


export default function WelcomeScreen({ navigation }) {
  const [password, setPasword] = useState('');
  const [isPasswordPromptVisible, setPassPromptVisible] = useState(false);

  const handlePasswordSubmit = () => {
    if (password === CHEF_PASSWORD) {
      setPassPromptVisible(false);
      navigation.navigate('AddDish'); //Hide password prompt
    } else {
      Alert.alert('Access Denied', "Invalid Password, PLease try again.");
    }
  };

  return (
    <View style={styles.parentView}>
      <View style={styles.topcontainer}>
        <Image source={require('../assets/logo.png')} style={{ width: 150, height: 150 }} />
      </View>
      <View /*style={styles.bottomcontainer}*/>
        <Text style={styles.text}>Welcome to our Menu app</Text>
        <Button style={styles.button} title="View Menu" onPress={() => navigation.navigate('Filter')} color="maroon" />
        <Button style={styles.button} title="Add Dish" onPress={() => setPassPromptVisible(true)} color="maroon" />
      </View>

      {/* Password Prompt */}
      {isPasswordPromptVisible && (
        <View style={styles.passwordcontainer}>
          <Text style={styles.text}>Enter Password Chef</Text>
          <TextInput style={styles.passwordinput}
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPasword} />
          <Button style={styles.button} title="Submit" onPress={handlePasswordSubmit} color="maroon" />
          <Button
            title="Cancel"
            onPress={() => setPassPromptVisible(false)} color="red" />
        </View >
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    //flex: 1, // Occupies the full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f8f8f8', // Optional background color

  },

  topcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
    width: 200,
    height: 200,
    borderColor: 'maroon',
    borderRadius: 15,
    borderWidth: 3,
    marginBottom: 20, //Add spacing between top and bottom containers
  },

  bottomcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-evenly',
    padding: 150,// Space inside the container
    width: 200,
    height: 200,
    borderColor: 'maroon',
    borderRadius: 15,
    borderWidth: 3,
  },

  text: {
    fontWeight: 'bold',
    fontFamily: 'cochin',
    fontSize: 20,
    color: 'maroon',
    marginBottom: 15, // Add spacing below text

  },

  button: {
    width: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },

  passwordcontainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: 300,
  },

  passwordinput: {
    width: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});