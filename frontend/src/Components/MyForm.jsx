import React, { useState } from 'react';
import './Form.css'

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
    <div className="ContainerForm">
      <form onSubmit={handleSubmit} className='Form'>
        <div >
          <label htmlFor="fname">
          الإسم
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
        <div >
          <label htmlFor="lname" >
          اللقب
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="level">
          المستوى الدراسي
          </label>
          <input
            type="level"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="university" >
          الجامعة
          </label>
          <input
            type="university"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id='button'>
        اطلب
        </button>
      </form>
        {qrCodeURL && (
        <div >
          <img src={`${backendURL}${qrCodeURL}`} alt="QR Code" /> <br/><br/>
        
        </div>
        
      )}
       
    </div>
  );
};

export default MyForm;
