// สร้างไฟล์ พื้นฐานของหน้า Home
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Home() {
     const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-2" onClick={() => navigate('/adduser')}>
                ไปหน้าเพิ่มผู้ใช้
            </button>
        </div>
    );
}

export default Home;