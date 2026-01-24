import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [url, setUrl] = useState("https://www.google.com");
  const qrRef = useRef();

  // --- Functions ---
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // --- Components ---

  // 1. Header Component
  const Header = () => (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.navContent}>
          <div style={styles.logo}>QR<span style={{color: '#2563eb'}}>Master</span></div>
          <nav style={styles.navLinks}>
            <a href="#generator" style={styles.navLink}>Generator</a>
            <a href="#how-to" style={styles.navLink}>How to Use</a>
            <a href="#benefits" style={styles.navLink}>Benefits</a>
          </nav>
        </div>
      </div>
    </header>
  );

  // 2. Generator Section (Hero)
  const GeneratorSection = () => (
    <section id="generator" style={styles.heroSection}>
      <div style={styles.container}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Create Professional QR Codes in Seconds</h1>
          <p style={styles.heroSubtitle}>Generate high-quality QR codes for your links, text, or business instantly. Free and secure.</p>
          
          <div style={styles.card}>
            <div ref={qrRef} style={styles.qrWrapper}>
               <QRCodeCanvas value={url} size={220} level={"H"} includeMargin={true} />
            </div>
            
            <div style={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Enter your website URL here..." 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                style={styles.input}
              />
              <button onClick={downloadQRCode} style={styles.button}>
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 3. How It Works Section
  const HowToUse = () => (
    <section id="how-to" style={styles.sectionAlt}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>How to Use</h2>
        <div style={styles.grid3}>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>1</div>
            <h3>Enter Content</h3>
            <p style={styles.textGray}>Paste your website URL, text, or information into the input box above.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>2</div>
            <h3>Preview Instantly</h3>
            <p style={styles.textGray}>Watch your QR code generate automatically in real-time as you type.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>3</div>
            <h3>Download & Share</h3>
            <p style={styles.textGray}>Click the download button to save your high-quality QR code image.</p>
          </div>
        </div>
      </div>
    </section>
  );

  // 4. Benefits Section
  const Benefits = () => (
    <section id="benefits" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.grid3}>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>⚡ Lightning Fast</h3>
            <p style={styles.textGray}>Zero loading time. Your QR codes are generated instantly directly in your browser.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>🔒 100% Secure</h3>
            <p style={styles.textGray}>We do not store your data. Everything happens locally on your device.</p>
          </div>
          <div style={styles.featureBox}>
            <h3 style={styles.featureTitle}>💎 High Resolution</h3>
            <p style={styles.textGray}>Download professional-grade PNG files ready for print or digital use.</p>
          </div>
        </div>
      </div>
    </section>
  );

  // 5. Footer Component
  const Footer = () => (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{...styles.logo, color: 'white', marginBottom: '15px'}}>QRMaster</div>
            <p style={{color: '#9ca3af', fontSize: '14px'}}>Making the world clickable, one QR code at a time.</p>
          </div>
          <div style={styles.footerLinksCol}>
            <h4 style={styles.footerHead}>Company</h4>
            <a href="#" style={styles.footerLink}>About Us</a>
            <a href="#" style={styles.footerLink}>Contact Us</a>
          </div>
          <div style={styles.footerLinksCol}>
            <h4 style={styles.footerHead}>Legal</h4>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms & Conditions</a>
          </div>
        </div>
        <div style={styles.copyright}>
          &copy; 2026 QR Code Generator. All rights reserved.
        </div>
      </div>
    </footer>
  );

  return (
    <div style={styles.main}>
      <Header />
      <GeneratorSection />
      <HowToUse />
      <Benefits />
      <Footer />
    </div>
  );
}

// --- CSS-in-JS Styles ---
const styles = {
  main: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#1f2937',
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
  },
  // Header Styles
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#4b5563',
    fontWeight: '500',
    fontSize: '15px',
    transition: '0.2s',
  },
  // Hero Styles
  heroSection: {
    backgroundColor: '#f9fafb',
    padding: '60px 0 80px 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: '800',
    marginBottom: '15px',
    color: '#111827',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '40px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid #f3f4f6',
  },
  qrWrapper: {
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '2px dashed #e5e7eb',
    borderRadius: '16px',
    display: 'inline-block',
    marginBottom: '25px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  // Section Styles
  section: {
    padding: '80px 0',
    backgroundColor: 'white',
  },
  sectionAlt: {
    padding: '80px 0',
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: '700',
    marginBottom: '50px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  // How to Use Styles
  stepCard: {
    textAlign: 'center',
    padding: '20px',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    margin: '0 auto 20px auto',
  },
  // Benefit Styles
  featureBox: {
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  featureTitle: {
    marginBottom: '10px',
    color: '#1f2937',
  },
  textGray: {
    color: '#6b7280',
    lineHeight: '1.6',
  },
  // Footer Styles
  footer: {
    backgroundColor: '#111827',
    color: 'white',
    padding: '60px 0 20px 0',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  footerHead: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#f9fafb',
  },
  footerLinksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  copyright: {
    borderTop: '1px solid #374151',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
  }
};

export default App;
