import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { initialMenuItems, courses } from './data';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const MenuEntry: React.FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const handleAddMenuItem = () => {
    if (dishName && description && course && price) {
      const newItem: MenuItem = {
        dishName,
        description,
        course,
        price,
      };

      const exists = menuItems.some(item => item.dishName.toLowerCase() === dishName.toLowerCase());
      if (exists) {
        alert("Dish name already exists!");
        return;
      }

      setMenuItems((prevItems) => [...prevItems, newItem]);
      setDishName('');
      setDescription('');
      setCourse(null);
      setPrice('');
    } else {
      alert("Please fill all fields");
    }
  };

  const handleRemoveMenuItem = (dishNameToRemove: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.dishName !== dishNameToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Item Entry</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        textAlign='center'
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <RNPickerSelect
        onValueChange={setCourse}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Course...', value: null }} 
        items={courses}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />
     

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dishName}</Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>{item.course}</Text>
            <Text style={styles.menuText}>${item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFCCCB', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  footer: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    // customize iOS styles here if needed
  },
  inputAndroid: {
    // customize Android styles here if needed
  },
};

export default MenuEntry;


