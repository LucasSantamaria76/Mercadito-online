import { getDatabase, ref, child, get } from 'firebase/database';
import { app } from './firebase_config';

const dbRef = ref(getDatabase(app));

export const getProducts = async () => {
  const res = await get(child(dbRef, 'products'));
  const products = await res.val();
  return products;
};
