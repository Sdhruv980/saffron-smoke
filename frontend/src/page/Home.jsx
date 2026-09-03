import { useState } from "react";
import AddReview from "./reviews/AddReview";

export default function Home() {

  const [showReview, setShowReview] = useState(false);


  return (
    <div>

      {/* Your Existing Home Page Content */}
      
      <h1>Welcome to Our Restaurant</h1>

      <p>
        Enjoy delicious food and great service.
      </p>


      {/* Give Review Section */}

      <section style={{
        marginTop:"50px",
        textAlign:"center"
      }}>

        <h2>
          Share Your Experience
        </h2>


        <button
          onClick={() => setShowReview(true)}
          style={{
            background:"#d97706",
            color:"white",
            border:"none",
            padding:"12px 25px",
            borderRadius:"8px",
            cursor:"pointer",
            fontSize:"16px"
          }}
        >
          Give Review
        </button>



        {showReview && (
          <div style={{
            marginTop:"30px"
          }}>
            <AddReview />
          </div>
        )}


      </section>


    </div>
  );
}