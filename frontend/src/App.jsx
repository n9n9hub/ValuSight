import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
    const [ticker, setTicker] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`搜尋代碼功能尚未實作: ${ticker}`);
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="logo">ValuSight 企業估值</div>
            </nav>

            <main className="main-content">
                <section className="hero">
                    <h1>快速評估企業真實價值</h1>
                    <p>輸入股票代碼或上傳 401 財報，獲得 AI 驅動的估值分析</p>

                    <div className="action-tabs">
                        {/* 簡單的分隔或 Tab 切換視覺可在此擴充 */}
                    </div>

                    <form onSubmit={handleSearch} className="search-box">
                        <input
                            type="text"
                            placeholder="輸入股票代碼 (例: AAPL)"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                        />
                        <button type="submit">開始分析</button>
                    </form>

                    <div className="divider" style={{ margin: '3rem 0', color: '#cbd5e1', position: 'relative' }}>
                        <span>或</span>
                    </div>

                    <FileUpload />

                </section>
            </main>
        </div>
    );
}

export default App;
