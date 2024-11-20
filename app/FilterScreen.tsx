import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, FlatList } from "react-native";
import menulist from './menu.json';

export default function FilterScreen() {
    const [selectedCourse, setSelectedCourse] = ('');

    const filterMenu = (course) => {
        setSelectedCourse(course);
    };

    const filteredMenu = menulist.filter((menu) => menu.course === selectedCourse || !selectedCourse);

    return (
        <View>
            <Text>Filter Menu by Course</Text>
            <View>
                <Button title="All" onPress={() => filterMenu('')} />
                <Button title="Starters" onPress={() => filterMenu('Starter')} />
                <Button title="Mains" onPress={() => filterMenu('Main')} />
                <Button title="Desserts" onPress={() => filterMenu('Dessert')} />
            </View>
            <FlatList
                data={filteredMenu}
                keyExtractor={(item) => item.course}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        {item.option.map((option) => (
                            <View style={styles.menuDisplayBox} key={option.name}>
                                <Text style={styles.name}>{option.name}</Text>
                                <Text style={styles.info}>{option.description}</Text>
                                <Text style={styles.info}>R {option.price}</Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});