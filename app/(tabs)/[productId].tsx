import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchProductById } from '../../ShopifyAPI';
import { useCart } from '../../CartContext';
import { Snackbar } from 'react-native-paper';

const ProductDetails = () => {
    const { productId } = useLocalSearchParams();
    const [product, setProduct] = useState<any>(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (productId) {
            fetchProductById(productId)
                .then((data) => setProduct(data))
                .catch((error) => console.error('Error fetching product:', error));
        }
    }, [productId]);

    const handleAddToCart = () => {
        if (product && product.variants.edges[0]?.node?.id) {
            addToCart({
                id: product.id,
                variantId: product.variants.edges[0].node.id,
                title: product.title,
                image: product.images.edges[0].node.src,
                quantity: 1,
            });
            setSnackbarVisible(true);
        }
    };

    if (!product) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.title}</Text>
            {product.images?.edges[0]?.node?.src && (
                <Image source={{ uri: product.images.edges[0].node.src }} style={styles.image} />
            )}
            {product.variants?.edges[0]?.node?.price?.amount && (
                <Text style={styles.price}>Price: {product.variants.edges[0].node.price.amount}</Text>
            )}
            <Button title="Add to Cart" onPress={handleAddToCart} color="#4CAF50" />

            {/* Snackbar */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={Snackbar.DURATION_SHORT}
                style={styles.snackbar}
            >
                {`${product.title} has been added to your cart.`}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
        borderRadius: 10,
    },
    price: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    snackbar: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    }
});

export default ProductDetails;
