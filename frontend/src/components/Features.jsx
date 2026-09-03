import { restaurant } from '../data/restaurant';

export default function Features() {
  return (
    <section className="section features">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Why Choose Us</span>
          <h2 className="section__title">Features & Amenities</h2>
        </div>
        <div className="features__grid">
          {restaurant.features.map((feature) => (
            <div key={feature} className="features__item">
              <span className="features__check">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
