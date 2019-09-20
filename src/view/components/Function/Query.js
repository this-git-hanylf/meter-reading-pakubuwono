export default function Query(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export function Select(list, keys) {
    const arr = [];
    list.map(data => {
        let obj = {};
        keys.map(key => {
            obj[key] = data[key];
        });
        arr.push(obj);
    });

    return arr;
}

export function Distinct(items, key) {
    var lookup = {};
    var result = [];

    for (var item, i = 0; (item = items[i++]); ) {
        var name = item[key];

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        }
    }

    return result;
}
