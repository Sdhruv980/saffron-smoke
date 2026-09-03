import { restaurant } from '../data/restaurant';

export default function MissionVision() {
  return (
    <section className="section mission">
      <div className="container">
        <div className="mission__grid">
          <div className="mission__card">
            <span className="mission__icon">🎯</span>
            <h3>Our Mission</h3>
            <p>{restaurant.mission}</p>
          </div>
          <div className="mission__card">
            <span className="mission__icon">✨</span>
            <h3>Our Vision</h3>
            <p>{restaurant.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
