import React from 'react';
import { FaHome, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding, FaStar } from 'react-icons/fa';
import './StojaTradeWebsite.css';

function StojaTradeWebsite() {
  const featuredProperties = [
    {
      title: 'Luksuzna vila s pogledom na morje',
      location: 'Piran, Slovenija',
      price: '€850,000',
      image: '🏡',
      beds: 4,
      baths: 3
    },
    {
      title: 'Moderno stanovanje v centru',
      location: 'Ljubljana, Slovenija',
      price: '€320,000',
      image: '🏢',
      beds: 2,
      baths: 2
    },
    {
      title: 'Prostorni apartma ob obali',
      location: 'Koper, Slovenija',
      price: '€450,000',
      image: '🏖️',
      beds: 3,
      baths: 2
    }
  ];

  return (
    <div className="stoja-website">
      {/* Header */}
      <header className="stoja-header">
        <div className="stoja-container">
          <div className="stoja-logo">
            <div className="logo-icon-red">🏠</div>
            <div className="logo-text">
              <h1>STOJA</h1>
              <p className="logo-subtitle">REAL ESTATE AGENCY</p>
            </div>
          </div>
          <nav className="stoja-nav">
            <a href="#properties">Properties</a>
            <a href="#projects">Projects</a>
            <a href="#construction">New construction</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-contact">
            <a href="tel:+38612800860">📞 +386 | 28 00 860</a>
            <a href="mailto:info@stoja-trade.si">✉️ info@stoja-trade.si</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="stoja-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Real estate brokerage is an art.</h1>
          
          {/* Search Bar */}
          <div className="hero-search">
            <div className="search-fields">
              <select className="search-select">
                <option>Rent</option>
                <option>Buy</option>
              </select>
              <select className="search-select">
                <option>Apartment</option>
                <option>House</option>
                <option>Land</option>
              </select>
              <select className="search-select">
                <option>Ljubljana mesto</option>
                <option>Koper</option>
                <option>Maribor</option>
              </select>
              <button className="search-button">Search</button>
            </div>
          </div>

          <p className="hero-subtitle">More than 2000 properties in Ljubljana, central Slovenia, and the Primorska region</p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="stoja-properties">
        <div className="stoja-container">
          <h2 className="section-title">Izbrane nepremičnine</h2>
          <p className="section-subtitle">Odkrijte naše najbolj priljubljene ponudbe</p>
          
          <div className="properties-grid">
            {featuredProperties.map((property, index) => (
              <div key={index} className="property-card">
                <div className="property-image">
                  <span className="property-emoji">{property.image}</span>
                </div>
                <div className="property-content">
                  <h3>{property.title}</h3>
                  <p className="property-location">
                    <FaMapMarkerAlt /> {property.location}
                  </p>
                  <div className="property-details">
                    <span>🛏️ {property.beds} sobe</span>
                    <span>🚿 {property.baths} kopalnice</span>
                  </div>
                  <div className="property-footer">
                    <span className="property-price">{property.price}</span>
                    <button className="view-btn">Poglej več</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="stoja-about">
        <div className="stoja-container">
          <div className="about-content">
            <h2>O Stoja Trade</h2>
            <p>
              Smo vodilna nepremičninska agencija v Sloveniji z več kot 15-letnimi izkušnjami. 
              Specializirani smo za prodajo ekskluzivnih nepremičnin ob slovenski obali in v Ljubljani.
            </p>
            <p>
              Naša ekipa strokovnjakov vam pomaga najti popolno nepremičnino, ki ustreza vašim potrebam in proračunu.
              Ponujamo celovite storitve – od iskanja nepremičnine do sklenitve pogodbe.
            </p>
            <div className="about-features">
              <div className="feature">
                <FaStar className="feature-icon" />
                <h4>Strokovna ekipa</h4>
                <p>Certificirani nepremičninski posredniki</p>
              </div>
              <div className="feature">
                <FaHome className="feature-icon" />
                <h4>Široka ponudba</h4>
                <p>Vile, stanovanja, poslovni prostori</p>
              </div>
              <div className="feature">
                <FaMapMarkerAlt className="feature-icon" />
                <h4>Najboljše lokacije</h4>
                <p>Obala, Ljubljana, ostala Slovenija</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="stoja-contact">
        <div className="stoja-container">
          <h2 className="section-title">Stopite v stik z nami</h2>
          <p className="section-subtitle">Radi vam pomagamo najti vašo sanjsko nepremičnino</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <h4>Telefon</h4>
                <p>+386 5 123 4567</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Email</h4>
                <p>info@stoja-trade.si</p>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h4>Naslov</h4>
                <p>Obala 123, 6000 Koper</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="stoja-footer">
        <div className="stoja-container">
          <div className="footer-content">
            <div className="footer-col">
              <h4>Stoja Trade</h4>
              <p>Premium Real Estate Slovenia</p>
              <p className="footer-note">Vaš zaupanja vreden partner za nepremičnine</p>
            </div>
            <div className="footer-col">
              <h4>Povezave</h4>
              <a href="#home">Domov</a>
              <a href="#properties">Nepremičnine</a>
              <a href="#about">O nas</a>
              <a href="#contact">Kontakt</a>
            </div>
            <div className="footer-col">
              <h4>Kontakt</h4>
              <p>+386 5 123 4567</p>
              <p>info@stoja-trade.si</p>
              <p>Obala 123, 6000 Koper</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Stoja Trade. Vse pravice pridržane.</p>
            <p className="ai-badge">🤖 Powered by L² Flows AI Automation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StojaTradeWebsite;

