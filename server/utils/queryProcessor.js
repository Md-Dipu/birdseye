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
const queryProcessor = (requestQueryObject) => {
    let {
        sort,
        page,
        limit,
        fields,
        ...filters
    } = requestQueryObject;

    // processing filters
    let filterStr = JSON.stringify(filters);
    filterStr = filterStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    filters = JSON.parse(filterStr);

    // digits string check
    const filterObjectParser = (object) => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (!isNaN(element)) {
                    object[key] = parseFloat(element);
                }

                if (typeof element === "object") {
                    filterObjectParser(object[key]);
                }
            }
        }
    };

    filterObjectParser(filters);

    // processing queries
    const queries = {};

    // sort string processing
    if (sort) {
        queries.sortby = {};

        sort = sort.split(",");
        sort.forEach(item => {
            if (item.startsWith("-")) {
                queries.sortby[item.substr(1)] = -1;
                return;
            }

            queries.sortby[item] = 1;
        });
    }

    // pagination processing
    queries.limit = parseInt(limit) || 10;
    queries.skip = queries.limit * (parseInt(page || 1) - 1);

    // projection fields processing
    if (fields) {
        queries.fields = {};

        fields = fields.split(",");
        fields.forEach(item => {
            if (item.startsWith("-")) {
                queries.fields[item.substr(1)] = 0;
                return;
            }

            queries.fields[item] = 1;
        });
    }

    return [filters, queries];
};

module.exports = queryProcessor;
