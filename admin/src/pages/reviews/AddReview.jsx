import { useState } from "react";
import { addReview } from "../../services/reviewService";

export default function AddReview() {

  const [review, setReview] = useState({
    name:"",
    rating:5,
    review:""
  });


  async function submitReview(e){
    e.preventDefault();

    try{

      await addReview(review);

      alert("Review submitted successfully");

      setReview({
        name:"",
        rating:5,
        review:""
      });

    }catch(err){
      console.log(err);
      alert("Something went wrong");
    }
  }


  return (
    <div>

      <h2>Give Your Review</h2>


      <form onSubmit={submitReview}>


        <input
          type="text"
          placeholder="Your Name"
          value={review.name}
          onChange={(e)=>
            setReview({
              ...review,
              name:e.target.value
            })
          }
        />


        <br/>


        <select
          value={review.rating}
          onChange={(e)=>
            setReview({
              ...review,
              rating:Number(e.target.value)
            })
          }
        >

          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>

        </select>


        <br/>


        <textarea
          placeholder="Write your review"
          value={review.review}
          onChange={(e)=>
            setReview({
              ...review,
              review:e.target.value
            })
          }
        />


        <br/>


        <button>
          Submit Review
        </button>


      </form>


    </div>
  );
}