/**
 * Process request query object
 * 
 * @typedef Query
 * @property {string} sort - Comma separated string
 * @property {string} page - Number string
 * @property {string} limit - Number string
 * @property {string} fields - Comma separated string
 * 
 * @param {Query} requestQueryObject 
 * @returns {[object | object]} filters and queries in pair
 */
exports.queryParser = (requestQueryObject) => {
    let {
        sort,
        page,
        limit,
        fields,
        ...filters
    } = requestQueryObject;

    // processing filters
    filters = this.filtersObjectParser(filters);

    // processing queries
    const queries = {};

    // sort string processing
    if (sort) {
        queries.sortby = this.commaSeparatedStringParser(sort, [-1, 1]);
    }

    // pagination processing
    queries.limit = parseInt(limit) || 10;
    queries.skip = queries.limit * (parseInt(page || 1) - 1);

    // projection fields processing
    if (fields) {
        queries.fields = this.commaSeparatedStringParser(fields);
    }

    return [filters, queries];
};

/**
 * Filters objects parser
 * 
 * @param {object} filters - Filter object from req.query
 * @returns {object} - Ready object for filtering document
 */
exports.filtersObjectParser = (filters) => {
    let filterStr = JSON.stringify(filters);
    filterStr = filterStr.replace(/\b(gt|gte|lt|lte|not|type)\b/g, match => `$${match}`);
    filters = JSON.parse(filterStr);

    // some different types like number, boolean and null string checker
    const specialStringParser = (object) => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (!isNaN(element)) {
                    object[key] = parseFloat(element);
                } else if (element === "null") {
                    object[key] = null;
                } else if (element === "true") {
                    object[key] = true;
                } else if (element === "false") {
                    object[key] = false;
                } else if (typeof element === "object") {
                    specialStringParser(object[key]);
                }
            }
        }
    };

    specialStringParser(filters);
    return filters;
};

/**
 * Comma separated string parser
 * 
 * @param {string} str - Comma separated string
 * @param {[number, number]} valuePair - Default value pair
 * @returns {object} - Field and direction value attached expected object
 */
exports.commaSeparatedStringParser = (str, valuePair = [0, 1]) => {
    const obj = {};
    const arr = str.split(",");
    arr.forEach(item => {
        if (item.startsWith("-")) {
            obj[item.substr(1)] = valuePair[0];
            return;
        }

        obj[item] = valuePair[1];
    });

    return obj;
};
