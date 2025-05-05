import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ProductItem from './component/ItemComponent';
import ProductForm from './component/FormComponent';
import DeleteConfirmationModal from './component/DeleteModalComponent';
import Toast from '.././component/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState({ id: null, name: '' });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
       const headers = await getAuthHeaders();
       const response = await fetch('http://10.0.2.2:3000/api/products', {
         headers,
       });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to fetch products. Please try again.', 'error');
    }
    setLoading(false);
  };

  const saveProduct = async (data) => {
    try {
      const headers = await getAuthHeaders();
      const url = selectedProduct
        ? `http://10.0.2.2:3000/api/products/${selectedProduct.id}`
        : 'http://10.0.2.2:3000/api/products';
      const method = selectedProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProducts();
        setModalVisible(false);
        setSelectedProduct(null);
        showToast(
          selectedProduct ? 'Product updated successfully!' : 'Product added successfully!',
          'success'
        );
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Failed to save product. Please try again.', 'error');
    }
  };

  const deleteProduct = (id, name) => {
    setDeleteProductData({ id, name });
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const { id } = deleteProductData;
    const headers = await getAuthHeaders();
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/products/${id}`, {
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        await fetchProducts();
        showToast('Product deleted successfully!', 'success');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Failed to delete product. Please try again.', 'error');
    }
    setDeleteModalVisible(false);
    setDeleteProductData({ id: null, name: '' });
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteProductData({ id: null, name: '' });
  };

  const openEditModal = (product) => {
    console.log('Opening edit modal with product:', product);
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const openCreateModal = () => {
    console.log('Opening create modal');
    setSelectedProduct(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setModalVisible(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2ecc71" />
          <Text style={styles.loadingText}>Loading Products...</Text>
        </View>
      ) : !products.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No Products Available</Text>
          <Text style={styles.emptyText}>Start by adding a new product to your list.</Text>
          <TouchableOpacity style={styles.addButton} onPress={openCreateModal} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Products</Text>
            <TouchableOpacity style={styles.addButton} onPress={openCreateModal} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductItem
                item={item}
                onEdit={openEditModal}
                onDelete={() => deleteProduct(item.id, item.name)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2ecc71']}
                tintColor="#2ecc71"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      <ProductForm
        visible={modalVisible}
        onSave={saveProduct}
        onCancel={closeModal}
        product={selectedProduct}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={hideToast}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        productName={deleteProductData.name}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    color: '#666',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  }
});

export default Products;