import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [url, setUrl] = useState("https://www.google.com");

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Segoe UI, Roboto, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    textAlign: 'center',
    maxWidth: '350px',
    width: '90%'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{margin: '0 0 25px 0', color: '#1a1a1a', fontWeight: '600'}}>QR Generator</h2>
        
        <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', display: 'inline-block', borderRadius: '12px', marginBottom: '20px' }}>
            <QRCodeCanvas id="qr-gen" value={url} size={200} level={"H"} />
        </div>

        <input 
            type="text" 
            placeholder="Paste your link here..." 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
            }}
        />

        <button onClick={downloadQRCode} style={{
            marginTop: '20px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: '0.3s'
        }}>
          Download QR Code
        </button>
      </div>
    </div>
  );
}

export default App;
