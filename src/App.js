import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [url, setUrl] = useState("https://www.google.com");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "my-qr-code.png";
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
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{margin: '0 0 20px 0', color: '#333'}}>QR Generator</h1>
        
        {/* QR Code Canvas */}
        <div style={{ padding: '10px', border: '1px solid #eee', display: 'inline-block', borderRadius: '10px' }}>
            <QRCodeCanvas 
                id="qr-gen" 
                value={url} 
                size={200} 
                bgColor={bgColor}
                fgColor={qrColor}
                level={"H"}
            />
        </div>

        {/* Inputs */}
        <div style={{marginTop: '20px', textAlign: 'left'}}>
            <label style={{fontSize: '14px', fontWeight: 'bold'}}>Enter URL:</label>
            <input 
                type="text" 
                placeholder="Enter link here..." 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                style={inputStyle}
            />
            
            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <div style={{flex: 1}}>
                    <label style={{fontSize: '12px'}}>QR Color</label>
                    <input 
                        type="color" 
                        value={qrColor} 
                        onChange={(e) => setQrColor(e.target.value)}
                        style={{width: '100%', height: '40px', border: 'none', cursor: 'pointer'}}
                    />
                </div>
                <div style={{flex: 1}}>
                    <label style={{fontSize: '12px'}}>Background</label>
                    <input 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)}
                        style={{width: '100%', height: '40px', border: 'none', cursor: 'pointer'}}
                    />
                </div>
            </div>
        </div>

        <button onClick={downloadQRCode} style={buttonStyle}>
          Download PNG
        </button>
      </div>
    </div>
  );
}

export default App;
