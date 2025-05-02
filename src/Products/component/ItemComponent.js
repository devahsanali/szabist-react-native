import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const ProductItem = ({ item, onEdit, onDelete }) => (
  <View style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text
        style={styles.itemDescription}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
      <Text style={styles.itemPrice}>
        ${item.price}
      </Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => onEdit(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  editButton: {
    backgroundColor: '#2ecc71',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default ProductItem;