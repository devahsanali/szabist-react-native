import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'react-native-check-box';

// Function to display the form
function ProductCreateForm() {
  // State variables for form inputs
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [productImageUri, setProductImageUri] = useState(''); // Image URI (empty initially)

  // Handle form submission
  const handleSubmit = () => {
    console.log('Product Created:');
    console.log('Product Name:', productName);
    console.log('Product Description:', productDescription);
    console.log('Product Price:', productPrice);
    console.log('Product Availability:', isAvailable);
    console.log('Product Category:', productCategory);
    console.log('Product Image URI:', productImageUri);

    // You can add your form submission logic here (e.g., send data to an API)
  };

  // Handle selecting an image (you can integrate image picker here)
  const handleImagePick = () => {
    // For now, we'll just use a placeholder image
    setProductImageUri('https://via.placeholder.com/150');
  };

  const handleCheckBoxChange = () => {
    setIsAvailable(!isAvailable);
    console.log('Availability toggled:', !isAvailable);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Avoid keyboard covering inputs on iOS
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Create a New Product</Text>

        {/* Product Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Product Description Textarea */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product Description:</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Enter product description"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Product Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product Price ($):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product price"
            value={productPrice}
            onChangeText={(text) => {
              if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                setProductPrice(text);
              }
            }}
            keyboardType="numeric"
          />
        </View>

        {/* Product Availability Checkbox */}
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Available for Sale:</Text>
          <CheckBox
            onClick={handleCheckBoxChange}
            isChecked={isAvailable}
            style={styles.checkbox}
          />
        </View>

        {/* Product Category Radio Buttons */}
        <View style={styles.radioContainer}>
          {/* Title of the Category Section */}
          <Text style={styles.title}>Select Product Category:</Text>

          <View style={styles.radioButton}>
            {/* Electronics Category */}
            <View style={styles.radioOption}>
              <TouchableOpacity
                onPress={() => setProductCategory('Electronics')}
                style={[styles.radioCircle, productCategory === 'Electronics' && styles.selectedRadio]}
              />
              <Text style={styles.radioText}>Electronics</Text>
            </View>

            {/* Clothing Category */}
            <View style={styles.radioOption}>
              <TouchableOpacity
                onPress={() => setProductCategory('Clothing')}
                style={[styles.radioCircle, productCategory === 'Clothing' && styles.selectedRadio]}
              />
              <Text style={styles.radioText}>Clothing</Text>
            </View>

            {/* Furniture Category */}
            <View style={styles.radioOption}>
              <TouchableOpacity
                onPress={() => setProductCategory('Furniture')}
                style={[styles.radioCircle, productCategory === 'Furniture' && styles.selectedRadio]}
              />
              <Text style={styles.radioText}>Furniture</Text>
            </View>
          </View>
        </View>



        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('./../assets/images/image.jpg')}  // Path to your local image
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/200' }}  // For remote images
            style={{ width: 200, height: 200, marginBottom: 20 }}  // Adjust size and margin
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Create Product" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const commonTextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'black',
};

const commonInputStyle = {
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  header: {
    ...commonTextStyle,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    ...commonTextStyle,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    ...commonInputStyle,
    height: 40,
  },
  textarea: {
    ...commonInputStyle,
    height: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginLeft: 10,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioButton: {
    // Adding padding to the whole container for better spacing
    paddingVertical: 10,
  },
  radioOption: {
    flexDirection: 'row', // Keep radio button and label in a row
    alignItems: 'center',  // Align them vertically centered
    marginBottom: 10, // Space between the options
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: 'blue',
  },
  radioText: {
    ...commonTextStyle,
    fontSize: 16,
  },
  title: {
    ...commonTextStyle,
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    ...commonTextStyle,
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default ProductCreateForm;
