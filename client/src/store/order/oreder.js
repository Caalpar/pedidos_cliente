import { writable } from 'svelte/store';
export const OrdersAllData = writable([]);
export const CurrentOrdersAllData = writable([]);
export const OrderData = writable({});
export const OrderDataEdit = writable({});