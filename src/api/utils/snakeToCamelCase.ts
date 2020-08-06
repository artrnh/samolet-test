type dataType = Record<string, any>[] | Record<string, any>;

export const snakeToCamelCase = (data: dataType) => {
    type valueType = string | dataType;

    const processVal = (val: valueType): valueType => {
        if (typeof val !== 'object' || val === null || val === undefined) {
            return val;
        }

        if (Array.isArray(val)) {
            return val.map(processVal);
        }

        return snakeToCamelCase(val);
    };

    const transformObj = (obj: valueType) =>
        Object.fromEntries(
            Object.entries(obj).map(([key, val]) => [
                key.replace(/_(.)/g, (segment) => segment[1].toUpperCase()),
                processVal(val)
            ])
        );

    return Array.isArray(data) ? data.map(transformObj) : transformObj(data);
};
