import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

const ProductItem = ({ item, onEdit, onDelete }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageWrapper}>
      {item.image ? (
        <Image
          source={{ uri: `http://10.0.2.2:3000/uploads/${item.image}` }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
    </View>

    <View style={styles.infoContainer}>
      <Text style={styles.itemName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text
        style={styles.itemDescription}
        numberOfLines={2}
      >
        {item.description}
      </Text>
      <Text style={styles.itemPrice}>
        ${item.price}
      </Text>
    </View>
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton]}
        onPress={() => onEdit(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
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
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  actionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    minWidth: 60,
    marginBottom: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#27ae60',
  },
  deleteButton: {
    backgroundColor: '#c0392b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProductItem;
