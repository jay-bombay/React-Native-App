import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchProducts } from '../../ShopifyAPI';

const ProductList = () => {
    const [products, setProducts] = useState<Array<{ node: { id: string; title: string; images: { edges: Array<{ node: { src: string } }> }; variants: { edges: Array<{ node: { price: { amount: string } } }> } } }>>([]);
    const router = useRouter();

    useEffect(() => {
        fetchProducts().then(setProducts).catch(error => console.error(error));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                {products.map(({ node }) => (
                    <View key={node.id} style={styles.productCard}>
                        <Text style={styles.title}>{node.title}</Text>
                        {node.images.edges[0] && node.images.edges[0].node && (
                            <Image source={{ uri: node.images.edges[0].node.src }} style={styles.image} />
                        )}
                        {node.variants.edges[0] && node.variants.edges[0].node && (
                            <Text style={styles.price}>Price: {node.variants.edges[0].node.price.amount}</Text>
                        )}
                        <Button
                            title="View Product"
                            onPress={() => {
                                const productId = node.id.split('/').pop() || '';
                                router.push({
                                    pathname: '/[productId]',
                                    params: { productId: productId }
                                });
                            }}
                            color="#4CAF50"
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#f5f5f5',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: '23%', // Adjusts the width for two items per row with space in between
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#333',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 5,
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    }
});

export default ProductList;
