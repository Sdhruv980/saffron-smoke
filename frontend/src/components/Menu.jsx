import { useEffect, useState } from "react";

const categoryIcons = {
  Starter: '🥗',
  'Main Course': '🍛',
  Pizza: '🍕',
  Pasta: '🍝',
  Dessert: '🍰',
  Beverage: '🍹',
};

export default function Menu() {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error(err));
  }, []);

  const categories = Array.isArray(menu)
    ? [...new Set(menu.map((item) => item.category))]
    : [];

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Culinary Delights</span>
          <h2 className="section__title">Popular Menu</h2>
          <p className="section__subtitle">
            Handcrafted dishes blending Indian tradition with global flavors
          </p>
        </div>
        <div className="menu__grid">
          {categories.map((category) => (
            <div key={category} className="menu__category">
              <h3 className="menu__category-title">
                <span className="menu__category-icon">
                  {categoryIcons[category] || '🍴'}
                </span>
                {category}
              </h3>
              <ul className="menu__items">
                {menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <li key={item.item} className="menu__item">
                      <span className="menu__item-name">{item.item}</span>
                      <span className="menu__item-dots" />
                      <span className="menu__item-price">₹{item.price}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

