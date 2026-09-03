import { restaurant } from '../data/restaurant';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Saffron & Smoke</span>
          <p className="footer__tagline">{restaurant.tagline}</p>
        </div>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#offers">Offers</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer__copy">
          © {year} {restaurant.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
