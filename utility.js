import items from './items.js';

export function getItemKey(key, itemid) {
    return items.find(i => i.itemid === itemid)[key];
};