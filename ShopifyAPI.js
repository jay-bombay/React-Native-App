import axios from 'axios';
const API_URL = 'https://kaas-testing.myshopify.com/api/2024-07/graphql.json'; // Update with your API URL
const API_TOKEN = '7ae45f197260711306e80ab29a8c6e3d';

export const fetchProducts = async () => {
    const query = `
        {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        images(first: 1) {
                            edges {
                                node {
                                    src
                                }
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    price {
                                        amount
                                        }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    
    const response = await axios.post(API_URL, { query }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': API_TOKEN
        }
    });
    return response.data.data.products.edges;
};

export const fetchProductById = async (id) => {
    const query = `
        query getProduct($id: ID!) {
            product(id: $id) {
                title
                images(first: 1) {
                    edges {
                        node {
                            src
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            id
                            price {
                                amount
                            }
                        }
                    }
                }
            }
        }
    `;

    const gid = `gid://shopify/Product/${id}`;
    const response = await axios.post(API_URL, { query, variables: { id: gid } }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': API_TOKEN
        }
    });

    return response.data.data.product;
};

