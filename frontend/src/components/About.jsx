import { restaurant } from '../data/restaurant';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Our Story</span>
          <h2 className="section__title">About Us</h2>
        </div>
        <div className="about__grid">
          <div className="about__text">
            <p className="about__description">{restaurant.about}</p>
            <div className="about__details">
              <div className="about__detail">
                <span className="about__detail-label">Location</span>
                <span className="about__detail-value">{restaurant.location}</span>
              </div>
              <div className="about__detail">
                <span className="about__detail-label">Hours (Weekdays)</span>
                <span className="about__detail-value">{restaurant.hours.weekday}</span>
              </div>
              <div className="about__detail">
                <span className="about__detail-label">Hours (Weekends)</span>
                <span className="about__detail-value">{restaurant.hours.weekend}</span>
              </div>
            </div>
          </div>
          <div className="about__visual">
            <div className="about__card about__card--1">
              <span className="about__card-icon">🍽️</span>
              <h3>Fine Dining</h3>
              <p>Casual elegance with world-class flavors</p>
            </div>
            <div className="about__card about__card--2">
              <span className="about__card-icon">🌿</span>
              <h3>Fresh Ingredients</h3>
              <p>Locally sourced, beautifully presented</p>
            </div>
            <div className="about__card about__card--3">
              <span className="about__card-icon">🎉</span>
              <h3>Memorable Moments</h3>
              <p>Perfect for every celebration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
