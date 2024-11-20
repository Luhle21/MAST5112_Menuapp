import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList } from "react-native";
import FilterScreen from "./FilterScreen";

export default function AddDishScreen({ navigation }) {
    const [menuItems, setMenuItems] = useState([]);
    const [newDish, setNewDish] = useState({ name: '', description: '', price: '', course: '' });

    const addDish = () => {
        if (newDish.name && newDish.description && newDish.price && newDish.course) {
            setMenuItems([...menuItems, newDish]);
            setNewDish({ name: '', description: '', price: '', course: '' });
        }
    };

    const removeDish = (index) => {
        setMenuItems(menuItems.filter((_, i) => i !== index));
    };

    const saveMenu = () => {
        // Save the menu to a persistent store or pass it to the home screen.
        console.log('Menu saved:', menuItems);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Add or Remove Menu Items </Text>
            <TextInput style={styles.input}
                placeholder="Dish Name"
                placeholderTextColor='maroon'
                value={newDish.name}
                onChangeText={(text) => setNewDish({ ...newDish, name: text })} />
            <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor='maroon'
                value={newDish.description}
                onChangeText={(text) => setNewDish({ ...newDish, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor='maroon'
                keyboardType="numeric"
                value={newDish.price}
                onChangeText={(text) => setNewDish({ ...newDish, price: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Course (e.g., Starter, Main, Dessert)"
                placeholderTextColor='maroon'
                value={newDish.course}
                onChangeText={(text) => setNewDish({ ...newDish, course: text })}
            />
            <Button title="Add Dish" onPress={addDish} />
            <FlatList
                data={menuItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.menuItem}>
                        <Text>{item.name} - {item.course}</Text>
                        <Button title="Remove" onPress={() => removeDish(index)} />
                    </View>
                )}
            />
            <Button title="Save Menu" onPress={saveMenu} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Occupies the full screen
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#f8f8f8', // Optional background color
    },

    input: {
        fontSize: 15,
        width: 300,
        height: 70,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 20,// Add some space between inputs
        borderColor: "maroon",
        textAlign: 'center',

    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'cochin',
        color: 'maroon',
        alignContent: 'center',
        marginBottom: 15,
    },

    button: {
        width: 100,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 10,
        color: "maroon",
    },
})