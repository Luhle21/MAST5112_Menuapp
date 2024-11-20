import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList, Alert, TouchableOpacity } from "react-native";
import menulist from '../menu.json';

export default function FilterScreen({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [addedDishes, setAddedDishes] = useState([]);

    // Filter combine menu (menulist + addedDishes)
    const getFilteredMenu = () => {
        const combinedMenu = [...menulist];

        addedDishes.forEach((dish) => {
            const courseIndex = combineMenu.findIndex((menu) => menu.course === dish.course);
            if (courseIndex !== -1) {
                combinedMenu[courseIndex].options.push(dish);
            } else {
                combinedMenu.push({
                    course: dish.course,
                    options: [dish]
                });
            }

        });
        return combinedMenu.filter((menu) => menu.course === selectedCourse || !selectedCourse);
    };
    const FilteredMenu = getFilteredMenu();

    //Total items in the filter menu
    const itemCount = FilteredMenu.reduce((
        total, menu) => total + menu.options.length,
        0
    );
    return (
        <View>
            <Text>Filter Menu</Text>
            <View>
                <Button title="ALL" onPress={() => setSelectedCourse('')} />
                <Button title="Starter" onPress={() => setSelectedCourse('Starter')} />
                <Button title="Main" onPress={() => setSelectedCourse('Main')} />
                <Button title="Dessert" onPress={() => setSelectedCourse('Dessert')} />
            </View>

            <Text styles={styles.info}> Total Item: {itemCount}</Text>

            <FlatList  >

            </FlatList>
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