import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../../CartContext';
import { Linking } from 'react-native';

const Cart = () => {
    const { cartItems, getCartUrl, removeFromCart } = useCart();

    const handleCheckout = () => {
        const cartUrl = getCartUrl();
        if (cartUrl) {
            Linking.openURL(cartUrl);
        }
    };

    if (cartItems.length === 0) {
        return <Text style={styles.emptyMessage}>Your cart is empty</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            {cartItems.map((item: { title: string; image: string; quantity: number; variantId: string }, index: number) => (
                <View key={index} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.variantId)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <Button title="Proceed to Checkout" onPress={handleCheckout} color="#4CAF50" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 14,
        color: '#888',
    },
    deleteButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ff4444',
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    }
});

export default Cart;
