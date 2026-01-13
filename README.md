# ValuSight - 企業估值平台

## 專案簡介
ValuSight 是一個智慧化企業估值平台，旨在協助投資者與企業主透過上傳財報或輸入股票代碼，快速獲得客觀的公司價值評估。

## 核心功能
*   **多源數據分析**：支援 PDF 財報解析 (401/損益表) 與公開市場數據 (API)。
*   **多模型估值**：內建 DCF (現金流折現)、P/E (本益比)、P/S (股價營收比) 等多種模型。
*   **視覺化報告**：自動生成包含財務體檢與同業比較的專業報告。

## 技術架構 (Tech Stack)
*   **前端 (Frontend)**: React, Vite, Vanilla CSS (Modules)
*   **後端 (Backend)**: Python, FastAPI, Pandas, NumPy
*   **資料庫 (Database)**: SQLite (開發模式)

## 快速開始 (Quick Start)

### 1. 後端設定
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
後端將啟動於: `http://localhost:8000`

### 2. 前端設定
```bash
cd frontend
npm install
npm run dev
```
前端將啟動於: `http://localhost:5173`

## 專案結構
```text
ValuSight/
├── frontend/          # React 前端應用
└── backend/           # FastAPI 後端應用
```

## 免責聲明
本專案分析結果僅供參考，不構成任何投資建議。
