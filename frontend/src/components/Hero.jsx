import { restaurant } from '../data/restaurant';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__badge">Est. {restaurant.established} · {restaurant.type}</p>
        <h1 className="hero__title">{restaurant.name}</h1>
        <p className="hero__tagline">{restaurant.tagline}</p>
        <div className="hero__cuisine">
          {restaurant.cuisine.map((c) => (
            <span key={c} className="hero__cuisine-tag">
              {c}
            </span>
          ))}
        </div>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--primary">
            View Menu
          </a>
          <a href="#contact" className="btn btn--outline">
            Book a Table
          </a>
        </div>
        <div className="hero__rating">
          <span className="hero__stars">★★★★★</span>
          <span className="hero__rating-text">
            {restaurant.rating} / 5 Customer Rating
          </span>
        </div>
      </div>
    </section>
  );
}
