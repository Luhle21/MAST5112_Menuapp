import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList, Alert, TouchableOpacity } from "react-native";
import menulist from '../menu.json';

export default function FilterScreen({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [addedDishes, setAddedDishes] = useState([]);

    // Combine menulist and added dishes
    const getFilteredMenu = () => {
        const combinedMenu = [...menulist];

        // Add dynamically added dishes to combinedMenu
        addedDishes.forEach((dish) => {
            const courseIndex = combinedMenu.findIndex((menu) => menu.course === dish.course);
            if (courseIndex !== -1) {
                combinedMenu[courseIndex].option.push(dish);
            } else {
                combinedMenu.push({
                    course: dish.course,
                    options: [dish],
                });
            }
        });

        return combinedMenu.filter((menu) => menu.course === selectedCourse || !selectedCourse);
    };

    const filteredMenu = getFilteredMenu();

    // Total items in the filtered menu
    const itemCount = filteredMenu.reduce(
        (total, menu) => total + (menu.options ? menu.options.length : 0),
        0
    );

    // Handle dish selection
    const handleDishSelection = (dish) => {
        Alert.alert(
            "Dish Selected",
            `You have selected: ${dish.name}\n\nDescription: ${dish.description}\nPrice: R ${dish.price}`,
            [{ text: "OK", onPress: () => console.log("Dish confirmed") }]
        );
    };

    // Main component return
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Filter Menu by Course</Text>
            <View style={styles.filterButtons}>
                <Button title="All" onPress={() => setSelectedCourse('')} color={'maroon'} />
                <Button title="Starters" onPress={() => setSelectedCourse('Starter')} color={'maroon'} />
                <Button title="Mains" onPress={() => setSelectedCourse('Main')} color={'maroon'} />
                <Button title="Desserts" onPress={() => setSelectedCourse('Dessert')} color={'maroon'} />
            </View>

            <Text style={styles.item}>Total Items: {itemCount}</Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'maroon',
        textAlign: 'center',
    },

    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,

    },

    item: {
        fontSize: 15,
        fontFamily: 'arial',
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#333',
    },

    info: {
        fontSize: 16,
        fontFamily: 'arial',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
    },

    course: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'maroon',
        marginTop: 5,
    },

    option: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'maroon',
        borderRadius: 5,
        elevation: 2,
    },

    name: {
        fontSize: 18,
        fontFamily: 'cocjin',
        fontWeight: 'bold',
        color: '#333',
    },

})