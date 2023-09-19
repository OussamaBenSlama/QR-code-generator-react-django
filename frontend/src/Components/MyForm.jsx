import React, { useState } from 'react';

const MyForm = () => {
  const backendURL = 'http://127.0.0.1:8000';
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    level: '',
    university: '',
  });

  const [qrCodeURL, setQRCodeURL] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/submit/'; // Replace with the actual API endpoint URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Assuming formData contains your form data
      });
      console.log(response)
      if (response.ok) {
        const responseData = await response.json();
        // responseData.qr_code_url contains the URL of the generated QR code image
        console.log('Form submitted successfully');
        console.log('QR Code URL:', responseData.qr_code_url);
        setQRCodeURL(responseData.qr_code_url);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handleDownload = () => {
    const qrCodeFilename = `qr_code-${formData.fname}-${formData.lname}-${formData.level}.png`; // Specify the filename here
    const downloadUrl = `${backendURL}/download-qr-code/${qrCodeFilename}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.click();
  };
  
  

  return (
    <div className="container" style={{width:'100%' , display:'flex', justifyContent:'center',alignItems:'center'}}>
      <div style={{width:'500px' , margin:'30px 0 30px 0'}}>
      <h2>QR code generator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">
            Level
          </label>
          <input
            type="level"
            className="form-control"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="university" className="form-label">
            University
          </label>
          <input
            type="university"
            className="form-control"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
        {qrCodeURL && (
        <div className="mt-4">
          <h3>QR Code</h3>
          <img src={`${backendURL}${qrCodeURL}`} alt="QR Code" />
        </div>
      )}
       {qrCodeURL && 
       (
        <button onClick={handleDownload} className="btn btn-secondary mt-2">
            Download QR Code
        </button>
       )}
      </div>
    </div>
  );
};

export default MyForm;
