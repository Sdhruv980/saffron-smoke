import axios from "axios";

const API = "http://localhost:5000/api/reviews";


// Add customer review
export async function addReview(review) {

    const response = await axios.post(
        API,
        review
    );

    return response.data;
}



// Get all reviews (Admin)
export async function getReviews() {

    const response = await axios.get(API);

    return response.data;
}



// Update review status (Approve/Reject)
export async function updateReview(id, data) {

    const response = await axios.put(
        `${API}/${id}`,
        data
    );

    return response.data;
}



// Delete review
export async function deleteReview(id) {

    const response = await axios.delete(
        `${API}/${id}`
    );

    return response.data;
}