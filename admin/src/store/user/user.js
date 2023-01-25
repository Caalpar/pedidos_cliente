import { writable } from 'svelte/store';

export const userBranchOfficeAllData = writable([]);
export const userBusinessAllData = writable([]);
export const userCashierAllData = writable([]);
export const userDeliveryAllData = writable([]);
export const userCustomerAllData = writable([]);
export const currentIdUser = writable('');
export const currentDatauser = writable({});