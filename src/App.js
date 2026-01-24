import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css'; // Agar aapke paas App.css hai to ye line rahne dein, warna hata sakte hain

function App() {
  // --- QR Logic State ---
  const [url, setUrl] = useState("https://www.google.com");

  // QR Download Function
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    if(canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // --- Website Design ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. HEADER / NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">QuickQR<span className="text-black">.Pro</span></div>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#tool" className="hover:text-blue-600 transition">Generator</a>
            <a href="#howto" className="hover:text-blue-600 transition">How to Use</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* 2. MAIN TOOL SECTION (HERO) */}
      <section id="tool" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Create QR Codes Instantly</h1>
          <p className="text-lg text-gray-600">Free, fast, and no sign-up required. Enter your link below.</p>
        </div>

        {/* Card Design */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-100">
          <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-xl inline-block mb-6">
            <QRCodeCanvas id="qr-gen" value={url} size={200} level={"H"} />
          </div>

          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-1">Enter Website URL</label>
              <input 
                type="text" 
                placeholder="https://your-website.com" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <button 
              onClick={downloadQRCode} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform active:scale-95 transition-all"
            >
              Download PNG
            </button>
          </div>
        </div>
      </section>

      {/* 3. HOW TO USE SECTION */}
      <section id="howto" className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="font-bold text-xl mb-2">1. Enter Link</h3>
              <p className="text-gray-600">Paste any URL, text, or email address in the input box.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-bold text-xl mb-2">2. Auto Generate</h3>
              <p className="text-gray-600">Our tool instantly creates a high-quality scannable QR code.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">⬇️</div>
              <h3 className="font-bold text-xl mb-2">3. Download</h3>
              <p className="text-gray-600">Click download to get your PNG file ready for printing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT & PRIVACY SECTION */}
      <section id="about" className="py-16 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="text-gray-600 leading-relaxed">
              QuickQR is a free tool developed by <strong>Aman's Projects</strong>. Our mission is to provide simple, privacy-focused digital tools for everyone. We do not store your data; everything runs locally in your browser.
            </p>
          </div>
          <div id="privacy">
            <h3 className="text-2xl font-bold mb-4">Privacy Policy</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We respect your privacy. This application operates as a client-side tool. The URLs you generate are processed instantly by your browser and are not sent to any backend server. No cookies are used for tracking purposes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER & CONTACT */}
      <footer id="contact" className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">QuickQR.Pro</span>
            <p className="text-gray-400 text-sm mt-2">© 2026 Aman's Projects. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Contact: support@amanprojects.com</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
