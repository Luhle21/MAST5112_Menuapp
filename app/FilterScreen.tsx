import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList, Alert, TouchableOpacity } from "react-native";
import menulist from '../menu.json';

export default function FilterScreen({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [newDish, setNewDish] = useState({ name: '', description: '', price: '', course: '' });

    {/*} const filterMenu = (course) => {
        setSelectedCourse(course);
    };*/}

    // Filter menu by course
    const filteredMenu = menulist.filter((menu) => menu.course === selectedCourse || !selectedCourse
    );

    // Total items in the filtered menu
    const itemCount = filteredMenu.reduce(
        (total, menu) => total + menu.options.length,
        0
    );

    // Add a new dish to the menu
    const addDish = () => {
        if (newDish.name && newDish.description && newDish.price && newDish.course) {
            const courseIndex = menulist.findIndex((menu) => menu.course === newDish.course);
            if (courseIndex !== -1) {
                // Add to existing course
                menulist[courseIndex].option.push({
                    name: newDish.name,
                    description: newDish.description,
                    price: parseFloat(newDish.price),
                });
            } else {
                // Add new course
                menulist.push({
                    course: newDish.course,
                    option: [{
                        name: newDish.name,
                        description: newDish.description,
                        price: parseFloat(newDish.price),
                    }],
                });
            }
            setNewDish({ name: '', description: '', price: '', course: '' });
            alert("Dish added!");
        } else {
            alert("Please fill in all fields!");
        }
    };

    // Handle dish selection
    const handleDishSelection = (dish) => {
        Alert.alert(
            "Dish Selected",
            `Name: ${dish.name}\nDescription: ${dish.description}\nPrice: R ${dish.price}`
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text} >Filter Menu by Course</Text>
            <View>
                <Button title="All" onPress={() => filterMenu('')} />
                <Button title="Starters" onPress={() => filterMenu('Starter')} />
                <Button title="Mains" onPress={() => filterMenu('Main')} />
                <Button title="Desserts" onPress={() => filterMenu('Dessert')} />
            </View>

            <Text> Total Item: {itemCount} </Text>

            <FlatList
                data={filteredMenu}
                keyExtractor={(item) => item.course}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.course}>{item.course}</Text>
                        {item.options.map((option, index) => (
                            <TouchableOpacity
                                style={styles.option}
                                key={index}
                                onPress={() => handleDishSelection(option)}
                            >
                                <Text style={styles.name}>{option.name}</Text>
                                <Text style={styles.info}>{option.description}</Text>
                                <Text style={styles.info}>R {option.price}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            <Text> Add New Dish </Text>
            <TextInput
                style={styles.input}
                placeholder="Dish Name"
                value={newDish.name}
                onChangeText={(text) => setNewDish({ ...newDish, name: text })}
            />
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
            <Button title="Add Dish" onPress={addDish} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Occupies the full screen
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#670E10', // Optional background color
    },

    text: {
        fontWeight: 'bold',
        fontFamily: 'cochin',
        fontSize: 20,
        color: 'white',
        marginTop: 15,
        marginBottom: 15, // Add spacing below text
    },

    course: {
        fontSize: 25,
        fontFamily: "cochin",
        fontStyle: 'italic',
        color: 'white',
        paddingLeft: 5,
    },

    name: {
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center',
    },

    info: {
        color: 'white',
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 15,
        padding: 1
    },

    count: {
        fontSize: 20,
        fontFamily: "cochin",
        fontStyle: 'italic',
        color: 'maroon',
        textAlign: 'right',
    },
});