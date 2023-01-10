import API from "../utilities/API";

const reviewAPI = new API('/api/v1/reviews');

export const getReviews = async (extension) => {
    const reviews = await reviewAPI.get(extension || '');
    return reviews;
};
