import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList } from "react-native";

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
        <View >
            <Text style={styles.text}> Add or Remove Menu Items </Text>
            <TextInput style={styles.input}
                placeholder="Dish Name"
                value={newDish.name}
                onChangeText={(text) => setNewDish({ ...newDish, name: text })} />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={newDish.description}
                onChangeText={(text) => setNewDish({ ...newDish, description: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={newDish.price}
                onChangeText={(text) => setNewDish({ ...newDish, price: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Course (e.g., Starter, Main, Dessert)"
                value={newDish.course}
                onChangeText={(text) => setNewDish({ ...newDish, course: text })}
            />
            <Button style={styles.button} title="Add Dish" onPress={addDish} />
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
        flex: 2, // Occupies the full screen
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#f8f8f8', // Optional background color
    },

    input: {},

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'cochin',
        color: 'maroon',
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