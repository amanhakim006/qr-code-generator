import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link, QrCode, ShieldCheck, Zap, Layers, ChevronRight, Menu } from 'lucide-react';

function App() {
  const [url, setUrl] = useState("https://www.google.com");
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="app-container">
      {/* --- INJECTED CSS FOR RESPONSIVENESS & ELEMENTS --- */}
      <style>{`
        :root {
          --primary: #4f46e5;
          --primary-dark: #4338ca;
          --bg-light: #f8fafc;
          --text-main: #1e293b;
          --text-muted: #64748b;
        }
        body {
          margin: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: var(--bg-light);
          color: var(--text-main);
          overflow-x: hidden;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Background Decoration */
        .bg-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          top: -200px;
          right: -200px;
          z-index: -1;
        }
        .bg-blob-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          bottom: -100px;
          left: -150px;
          z-index: -1;
        }

        /* Header */
        header {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 16px 0;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 24px;
          color: var(--text-main);
        }
        .nav-links {
          display: flex;
          gap: 30px;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          transition: 0.3s;
          font-size: 15px;
        }
        .nav-links a:hover {
          color: var(--primary);
        }

        /* Hero / Generator */
        .hero-section {
          padding: 80px 0;
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .hero-text h1 {
          font-size: 48px;
          line-height: 1.2;
          margin-bottom: 20px;
          background: linear-gradient(to right, #1e293b, #4f46e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-text p {
          font-size: 18px;
          color: var(--text-muted);
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        /* Generator Card */
        .gen-card {
          background: white;
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
        }
        .qr-frame {
          background: white;
          padding: 20px;
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          display: inline-block;
          margin-bottom: 25px;
        }
        .input-wrapper {
          position: relative;
          margin-bottom: 15px;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .url-input {
          width: 100%;
          padding: 14px 14px 14px 45px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
          transition: 0.2s;
          box-sizing: border-box;
        }
        .url-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .btn-download {
          width: 100%;
          padding: 14px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.2s;
        }
        .btn-download:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        /* Steps Section */
        .section {
          padding: 80px 0;
        }
        .bg-white { background: white; }
        .section-title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 50px;
          font-weight: 700;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .step-card {
          padding: 30px;
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          transition: 0.3s;
        }
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }
        .icon-box {
          width: 50px;
          height: 50px;
          background: #e0e7ff;
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .step-card h3 { margin: 0 0 10px 0; font-size: 18px; }
        .step-card p { margin: 0; color: var(--text-muted); line-height: 1.5; }

        /* Footer */
        footer {
          background: #0f172a;
          color: white;
          padding: 60px 0 30px 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-logo {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-text { color: #94a3b8; line-height: 1.6; max-width: 300px; }
        .footer-col h4 { color: white; margin-bottom: 20px; font-size: 16px; }
        .footer-col a { display: block; color: #94a3b8; text-decoration: none; margin-bottom: 12px; font-size: 14px; transition: 0.2s; }
        .footer-col a:hover { color: white; }
        .copyright {
          border-top: 1px solid #1e293b;
          padding-top: 25px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-text h1 { font-size: 36px; }
          .grid-3 { grid-template-columns: 1fr; }
          .nav-links { display: none; } /* Simplified nav for mobile */
          .footer-grid { grid-template-columns: 1fr; gap: 30px; }
          .gen-card { padding: 20px; }
        }
      `}</style>

      {/* --- BACKGROUND DECORATION --- */}
      <div className="bg-blob"></div>
      <div className="bg-blob-2"></div>

      {/* --- HEADER --- */}
      <header>
        <div className="container nav-content">
          <div className="logo">
            <QrCode size={32} color="#4f46e5" />
            <span>QR<span style={{color: '#4f46e5'}}>Gen</span></span>
          </div>
          <nav className="nav-links">
            <a href="#generator">Generator</a>
            <a href="#how-to">How it Works</a>
            <a href="#benefits">Features</a>
          </nav>
        </div>
      </header>

      {/* --- HERO / GENERATOR --- */}
      <section className="hero-section" id="generator">
        <div className="container hero-grid">
          
          <div className="hero-text">
            <h1>Create Professional QR Codes Instantly</h1>
            <p>Generate high-quality, scannable QR codes for your business, links, or personal use. 100% Free and Private.</p>
            <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '14px'}}>
                 <ShieldCheck size={18} /> No Data Stored
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '14px'}}>
                 <Zap size={18} /> Instant Download
              </div>
            </div>
          </div>

          <div className="gen-card">
            <div ref={qrRef} className="qr-frame">
              <QRCodeCanvas value={url} size={200} level={"H"} />
            </div>
            
            <div className="input-wrapper">
              <Link className="input-icon" size={20} />
              <input 
                type="text" 
                className="url-input"
                placeholder="https://yourwebsite.com" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button onClick={downloadQRCode} className="btn-download">
              <Download size={20} /> Download PNG
            </button>
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-to" className="section bg-white">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="grid-3">
            <div className="step-card">
              <div className="icon-box"><Link size={24} /></div>
              <h3>1. Enter Content</h3>
              <p>Simply paste your website link, text, or information in the input box.</p>
            </div>
            <div className="step-card">
              <div className="icon-box"><QrCode size={24} /></div>
              <h3>2. Auto Generate</h3>
              <p>Our advanced system creates your custom QR code in real-time instantly.</p>
            </div>
            <div className="step-card">
              <div className="icon-box"><Download size={24} /></div>
              <h3>3. Download</h3>
              <p>Save your high-resolution QR code as a PNG file and share it anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="benefits" className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="grid-3">
            <div className="step-card" style={{border: 'none', background: 'transparent', textAlign: 'left', padding: '0'}}>
              <div className="icon-box" style={{background: 'white', border: '1px solid #e2e8f0'}}><Zap size={24} /></div>
              <h3>Lightning Fast</h3>
              <p>Built with React for zero lag. Your QR codes appear instantly as you type.</p>
            </div>
            <div className="step-card" style={{border: 'none', background: 'transparent', textAlign: 'left', padding: '0'}}>
              <div className="icon-box" style={{background: 'white', border: '1px solid #e2e8f0'}}><Layers size={24} /></div>
              <h3>High Quality</h3>
              <p>Optimized for print and digital screens. Your codes will always scan perfectly.</p>
            </div>
            <div className="step-card" style={{border: 'none', background: 'transparent', textAlign: 'left', padding: '0'}}>
              <div className="icon-box" style={{background: 'white', border: '1px solid #e2e8f0'}}><ShieldCheck size={24} /></div>
              <h3>Privacy First</h3>
              <p>We process everything in your browser. No data is ever sent to a server.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <QrCode size={28} /> QRGen
              </div>
              <p className="footer-text">The simplest, fastest, and most secure way to create QR codes for your needs.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#generator">Generator</a>
              <a href="#how-to">How to Use</a>
              <a href="#benefits">Features</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="copyright">
            © 2026 QR Code Generator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
