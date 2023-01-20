export const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}

export const scrollToSectionStart = (id) =>
    () => setTimeout(() =>
        document.getElementById(id)
            .scrollIntoView({ block: "start" }));

export const parseDigitStrings = (object) => {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if (!isNaN(element)) {
                object[key] = parseInt(element);
            } else if (typeof element === 'object') {
                parseDigitStrings(object[key]);
            }
        }
    }
};

export const filterUniqueProperties = (object, target) => {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if (element === target[key]) {
                delete object[key];
            }
        }
    }
};
