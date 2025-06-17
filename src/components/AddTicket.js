import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ลบบรรทัดนี้ออก!!

function AddTicket() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [create_at, setCreateAt] = useState('');
    const [result, setResult] = useState(null);

    const handleAddUser = async () => {
        try {
            // เรียกผ่าน window.api แทน
            const user = await window.api.addTicket(title, create_at);
            setResult(`เพิ่มผู้ใช้สำเร็จ: id=${user.id}, naneticket=${user.naneticket}, created_date=${user.created_date}`);
        } catch (err) {
            setResult(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h3 className="mb-3">Add Ticket</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={create_at}
                        onChange={e => setCreateAt(e.target.value)}
                        placeholder="วันที่และเวลา"
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

export default AddTicket;