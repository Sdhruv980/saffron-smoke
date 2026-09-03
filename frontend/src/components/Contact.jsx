import { useState } from "react";
import { restaurant } from "../data/restaurant";
import API_BASE from "../config";

export default function Contact() {

  // Reservation form
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });


  // Contact message form
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  // Reservation input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // Reservation submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });


      const data = await res.json();


      if (res.ok) {

        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
          setForm({
            name: "",
            phone: "",
            guests: "2",
            date: "",
            time: "19:00",
            occasion: "",
            notes: "",
          });
        }, 4000);

      } else {

        alert(data.message || "Failed to book table");

      }


    } catch (err) {

      console.error(err);
      alert("Something went wrong!");

    }

  };


  // Message input change
  const handleMessageChange = (e) => {

    setMessageForm({
      ...messageForm,
      [e.target.name]: e.target.value,
    });

  };


  // Message submit
  const handleMessageSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        `${API_BASE}/api/messages`,
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(messageForm),
        }
      );


      const data = await res.json();


      if(res.ok){

        setMessageSubmitted(true);

        setMessageForm({
          name:"",
          email:"",
          subject:"",
          message:"",
        });

      }
      else{

        alert(data.message);

      }


    } catch(err){

      console.error(err);
      alert("Message server error");

    }

  };



  return (

<section id="contact" className="section contact">

<div className="container">


<div className="section__header">

<span className="section__label">
Get in Touch
</span>

<h2 className="section__title">
Contact & Reservations
</h2>

</div>



<div className="contact__grid">



{/* Restaurant Information */}

<div className="contact__info">


<div className="contact__card">
<span className="contact__icon">📍</span>

<div>
<h4>Address</h4>
<p>{restaurant.location}</p>
</div>

</div>



<div className="contact__card">

<span className="contact__icon">📞</span>

<div>
<h4>Phone</h4>

<a href={`tel:${restaurant.contact.phone.replace(/\s/g,"")}`}>
{restaurant.contact.phone}
</a>

</div>

</div>



<div className="contact__card">

<span className="contact__icon">✉️</span>

<div>

<h4>Email</h4>

<a href={`mailto:${restaurant.contact.email}`}>
{restaurant.contact.email}
</a>

</div>

</div>



<div className="contact__card">

<span className="contact__icon">🕐</span>

<div>

<h4>Opening Hours</h4>

<p>{restaurant.hours.weekday}</p>

<p>{restaurant.hours.weekend}</p>


</div>

</div>



</div>





{/* Forms */}

<div className="contact__form-wrapper">


{/* Reservation */}

{submitted ? (

<div className="contact__success">

<h3>
Reservation Request Sent!
</h3>

<p>
Thank you. We will confirm your table shortly.
</p>


<button
className="btn btn--outline"
onClick={()=>setSubmitted(false)}
>
Make Another Reservation
</button>


</div>


) : (


<form
className="contact__form"
onSubmit={handleSubmit}
>


<h3>
Reserve a Table
</h3>


<input
type="text"
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
required
/>


<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
/>



<input
type="tel"
name="phone"
placeholder="Phone"
value={form.phone}
onChange={handleChange}
required
/>



<input
type="date"
name="date"
value={form.date}
onChange={handleChange}
required
/>



<input
type="time"
name="time"
value={form.time}
onChange={handleChange}
required
/>



<select
name="guests"
value={form.guests}
onChange={handleChange}
>

<option value="1">
1 Guest
</option>

<option value="2">
2 Guests
</option>

<option value="3">
3 Guests
</option>

<option value="4">
4 Guests
</option>

<option value="5">
5 Guests
</option>

<option value="6">
6 Guests
</option>

</select>



<textarea
name="message"
placeholder="Special Requests"
value={form.message}
onChange={handleChange}
/>



<button
className="btn btn--primary btn--full"
>
Confirm Reservation
</button>



</form>


)}







{/* Contact Message */}

<div style={{marginTop:"40px"}}>


{
messageSubmitted ? (

<div className="contact__success">

<h3>
Message Sent Successfully!
</h3>

<p>
Thank you for contacting us.
</p>


<button
className="btn btn--outline"
onClick={()=>setMessageSubmitted(false)}
>
Send Another Message
</button>


</div>


) : (


<form
className="contact__form"
onSubmit={handleMessageSubmit}
>


<h3>
Contact Us
</h3>


<input
type="text"
name="name"
placeholder="Your Name"
value={messageForm.name}
onChange={handleMessageChange}
required
/>



<input
type="email"
name="email"
placeholder="Your Email"
value={messageForm.email}
onChange={handleMessageChange}
required
/>



<input
type="text"
name="subject"
placeholder="Subject"
value={messageForm.subject}
onChange={handleMessageChange}
/>



<textarea
name="message"
placeholder="Write your message"
rows="4"
value={messageForm.message}
onChange={handleMessageChange}
required
/>



<button
className="btn btn--primary btn--full"
>
Send Message
</button>



</form>


)

}


</div>



</div>


</div>


</div>


</section>

  );
}