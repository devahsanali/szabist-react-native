import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3000/api/products'); // Replace with your API endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  // Fetch data on load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle the pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();  // Re-fetch the data
    setRefreshing(false);
  };

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}  // The fetched products data
        renderItem={renderItem}  // Function to render each item
        keyExtractor={(item) => item.id.toString()}  // Ensure 'id' is a string
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}  // Trigger the re-fetch when user pulls down
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});

export default Products;
