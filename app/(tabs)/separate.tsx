import React from 'react';
import { SafeAreaView, Text, FlatList, View, Button, StyleSheet } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

type SeparateProps = {
  menuItems: MenuItem[];
  handleRemoveMenuItem: (dishNameToRemove: string) => void;
};

const separate: React.FC<SeparateProps> = ({ menuItems, handleRemoveMenuItem }) => {
  const [filteredCourse, setFilteredCourse] = React.useState<string | null>(null);

  const filteredItems = filteredCourse 
    ? menuItems.filter(item => item.course === filteredCourse) 
    : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Separate Menu Page</Text>
      
      {/* Pickers for filtering by course */}
      <Button title="Show Starters" onPress={() => setFilteredCourse('Starters')} />
      <Button title="Show Main Course" onPress={() => setFilteredCourse('Main Course')} />
      <Button title="Show Desserts" onPress={() => setFilteredCourse('Desserts')} />
      <Button title="Show All" onPress={() => setFilteredCourse(null)} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dishName}</Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>{item.course}</Text>
            <Text style={styles.menuText}>${item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveMenuItem(item.dishName)} />
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
    // customize Android styles here if needed
  },
};
