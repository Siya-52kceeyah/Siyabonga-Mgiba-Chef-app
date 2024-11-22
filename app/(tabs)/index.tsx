import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

// Define a type for menu items
interface MenuItem {
  id: number;
  name: string;
  price: number;
  course: 'starter' | 'main' | 'dessert';
}

// Sample menu items
const initialMenuItems: MenuItem[] = [
  { id: 1, name: 'Caesar Salad', price: 5.99, course: 'starter' },
  { id: 2, name: 'Steak', price: 15.99, course: 'main' },
  { id: 3, name: 'Cheesecake', price: 6.99, course: 'dessert' },
  { id: 4, name: 'Bruschetta', price: 4.99, course: 'starter' },
  { id: 5, name: 'Pasta', price: 12.99, course: 'main' },
];

const IndexScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [filteredCourse, setFilteredCourse] = useState<string>('all');

  const removeItem = (id: number) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const filteredItems = filteredCourse === 'all'
    ? menuItems
    : menuItems.filter((item) => item.course === filteredCourse);

  const calculateAveragePrice = (items: MenuItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return items.length > 0 ? (total / items.length).toFixed(2) : '0.00';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.buttonContainer}>
        <Button title="Show All" onPress={() => setFilteredCourse('all')} />
        <Button title="Starters" onPress={() => setFilteredCourse('starter')} />
        <Button title="Main Courses" onPress={() => setFilteredCourse('main')} />
        <Button title="Desserts" onPress={() => setFilteredCourse('dessert')} />
      </View>
      <Text style={styles.averagePrice}>
        Average Price: ${calculateAveragePrice(filteredItems)}
      </Text>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price.toFixed(2)}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  averagePrice: {
    fontSize: 18,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IndexScreen;
