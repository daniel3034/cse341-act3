import client from './db.js';

export const getItemsCollection = () => client.db('items').collection('items');