import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ลบบรรทัดนี้ออก!!
// const { ipcRenderer } = window.require('electron');

function AddUser() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [result, setResult] = useState(null);

    const handleAddUser = async () => {
        try {
            // เรียกผ่าน window.api แทน
            const user = await window.api.addUser(name, phone);
            setResult(`เพิ่มผู้ใช้สำเร็จ: id=${user.id}, name=${user.name}, phone=${user.phone}`);
        } catch (err) {
            setResult(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h3 className="mb-3">เพิ่มผู้ใช้</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="ชื่อผู้ใช้"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="เบอร์โทร"
                    />
                </div>
                <button className="btn btn-primary me-2" onClick={handleAddUser}>
                    เพิ่มผู้ใช้
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    กลับไปหน้าแรก
                </button>
                {result && <div className="alert alert-info mt-3">{result}</div>}
            </div>
        </div>
    );
}

export default AddUser;