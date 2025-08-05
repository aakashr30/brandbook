import React from 'react';

const Footer = () => {
  return (
    <footer className="futuristic-footer">
      <style jsx>{`
       .futuristic-footer {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%);
  color: #ffffff;
  padding: 2rem;
  border-top: 2px solid #ffffff;
  box-shadow: 0 -10px 30px rgba(255, 255, 255, 0.1);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative; /* keep only if needed for ::before animations */
  z-index: 10; /* Keep footer behind floating effects */
}

        .futuristic-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .footer-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 800px;
        }

        .brand-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #ffffff, #cccccc, #999999);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 3px;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
          }
        }

        .tagline {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #cccccc;
          opacity: 0.9;
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .nav-link {
          color: #999999;
          text-decoration: none;
          font-size: 1.1rem;
          position: relative;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: skewX(-10deg) translateX(-100%);
          transition: transform 0.5s ease;
          z-index: -1;
        }

        .nav-link:hover::before {
          transform: skewX(-10deg) translateX(100%);
        }

        .nav-link:hover {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }

        .floating-cube {
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #ffffff, #cccccc);
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
          opacity: 0.4;
        }

        .floating-cube:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-cube:nth-child(2) {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-cube:nth-child(3) {
          top: 80%;
          left: 20%;
          animation-delay: 4s;
        }

        .floating-cube:nth-child(4) {
          top: 30%;
          right: 30%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotateX(0) rotateY(0);
          }
          25% {
            transform: translateY(-20px) rotateX(90deg) rotateY(45deg);
          }
          50% {
            transform: translateY(-10px) rotateX(180deg) rotateY(90deg);
          }
          75% {
            transform: translateY(-25px) rotateX(270deg) rotateY(135deg);
          }
        }

        .copyright {
          color: #666666;
          font-size: 0.9rem;
          margin-top: 1rem;
          opacity: 0.8;
        }

        .circuit-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.03;
          background-image: 
            linear-gradient(90deg, #ffffff 1px, transparent 1px),
            linear-gradient(0deg, #ffffff 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 1;
        }

        .tech-accent {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ffffff;
          margin-top: 1rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
          }
          50% { 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
        }

        @media (max-width: 768px) {
          .brand-title {
            font-size: 2rem;
            letter-spacing: 2px;
          }
          
          .nav-links {
            gap: 1.5rem;
            flex-direction: column;
            align-items: center;
          }
          
          .tagline {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="circuit-pattern"></div>

      <div className="floating-elements">
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
      </div>

      <div className="footer-content">
        <h1 className="brand-title">Brand Book</h1>
        <p className="tagline">Sculpting Digital Realities</p>

        <nav className="nav-links">
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="tech-accent">Advanced 3D Modeling</div>

        <div className="copyright">
          © 2025 3D Studio. Crafting tomorrow's visual experiences.
        </div>
      </div>
    </footer>
  );
};

export default Footer;