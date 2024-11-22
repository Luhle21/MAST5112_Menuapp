import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList, Alert } from "react-native";
import FilterScreen from "./FilterScreen";
import menulist from "../menu.json";

export default function AddDishScreen({ navigation }) {
    const [menuItems, setMenuItems] = useState([]);
    const [newDish, setNewDish] = useState({ name: '', description: '', price: '', course: '' });
    const [menuButtonVisible, setMenuButtonVisible] = useState(false);

    const addDish = () => {
        if (newDish.name && newDish.description && newDish.price && newDish.course) {
            setMenuItems([...menuItems, newDish]);
            const courseIndex = menulist.findIndex((menu) => menu.course === newDish.course);
            if (courseIndex !== -1) {
                // Add to existing course
                menulist[courseIndex].options.push({
                    name: newDish.name,
                    description: newDish.description,
                    price: parseFloat(newDish.price),
                });
            } else {
                // Add a new course
                menulist.push({
                    course: newDish.course,
                    options: [{
                        name: newDish.name,
                        description: newDish.description,
                        price: parseFloat(newDish.price),
                    }],
                });
            }
            setMenuItems([...menuItems, newDish]); // Track added items
            setNewDish({ name: '', description: '', price: '', course: '' });
            alert("Dish added!");
        } else {
            alert("Please fill in all fields!");
        }
    };

    const removeDish = (index) => {
        Alert.alert(
            "Remove Dish",
            "Are you sure you want to remove this dish?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        // Remove from both the local state and the menu.json structure
                        const updatedItems = [...menuItems];
                        const dishToRemove = updatedItems[index];
                        const courseIndex = menulist.findIndex(menu => menu.course === dishToRemove.course);

                        if (courseIndex !== -1) {
                            menulist[courseIndex].option = menulist[courseIndex].option.filter(
                                (option) => options.name !== dishToRemove.name
                            );
                        }

                        updatedItems.splice(index, 1);
                        setMenuItems(updatedItems);
                    },
                },
            ]
        );
    };

    const saveMenu = () => {
        // Display the menu button after saving
        setMenuButtonVisible(true);
        alert("Menu saved!");
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
            <Button title="Add Dish" onPress={addDish} color={'maroon'} />
            <FlatList
                data={menuItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.menuItem}>
                        <Text>{item.name} - {item.course}</Text>
                        <Button title="Remove" onPress={() => removeDish(index)} color={'maroon'} />
                    </View>
                )}
            />
            <Button title="Save Menu" onPress={saveMenu} color={'maroon'} />
            {/*Condtion Menu Button*/}
            {menuButtonVisible && (
                <Button title="Menu Saved"
                    onPress={() => setMenuButtonVisible(false)}
                />
            )}
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