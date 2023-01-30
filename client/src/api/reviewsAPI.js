import API from "../utilities/API";

const reviewAPI = new API('/api/v1/reviews');

export const getReviews = async (extension) => {
    const reviews = await reviewAPI.get(extension || '');
    return reviews;
};

export const postReview = async (data) => {
    const result = await reviewAPI.post(data);
    return result;
};
