import { ObjectId } from 'mongodb';
import { getItemsCollection } from '../models/items.js';

const validateItem = (item) => {
  if (
    !item.name ||
    !item.description ||
    typeof item.price !== 'number' ||
    !item.category ||
    typeof item.stock !== 'number' ||
    !item.sku ||
    !item.manufacturer
  ) {
    return false;
  }
  return true;
};

export const getAllItems = async (req, res) => {
  try {
    const collection = getItemsCollection();
    const items = await collection.find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const collection = getItemsCollection();
    const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  if (!validateItem(item)) {
    return res.status(400).json({ error: 'Invalid item data' });
  }
  try {
    const collection = getItemsCollection();
    const result = await collection.insertOne(item);
    res.status(201).json({ _id: result.insertedId, ...item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req, res) => {
  const item = req.body;
  if (!validateItem(item)) {
    return res.status(400).json({ error: 'Invalid item data' });
  }
  try {
    const collection = getItemsCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: item }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const collection = getItemsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
