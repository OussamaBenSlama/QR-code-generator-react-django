import React from 'react';
import './Section.css';
import img from '../res/section.png';
import { useNavigate } from 'react-router-dom';


const Section = () => {
  const navigate = useNavigate()
  const goToForm = ()=> {
    navigate('/form')
  }
  return (
    <div className='Section'>
      <div className='section-right'>
        <img src={img} alt='student learning' />
      </div>
      {/* left section */}
      <div className='section-left'>
        <div>
            <h1>
                        هويتك الرقمية <span>للولوج الآمن</span> للخدمات الإلكترونية
            </h1>
            <p>
            خدمة ء-هوية هي هويتك الرقمية على الجوال التي تسمح لك بالولوج الآمن على الخط للبوابات الحكومية والخدمات الإلكترونية. كما تمكنك من التوقيع الإلكتروني على الوثائق والمصادقة على المعاملات الإلكترونية.
            </p>
            <div className='btn'>
              <button className='explore_btn' onClick={goToForm}>اطلب الآن</button>
              {/* <button className='rejoindre_btn'>Partager</button> */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
