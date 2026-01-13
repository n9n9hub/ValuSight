# 更新日誌 (Changelog)

## [Unreleased]

## [0.2.0] - 2026-01-13

### ✨ 新增功能 (Added)
*   **核心功能**: 實作 PDF 財報解析引擎 (`backend/app/services/pdf_parser.py`)，支援從上傳文件中提取文字。
*   **API**: 新增 `/api/upload` 檔案上傳接口。
*   **UI Component**: 新增前端 `FileUpload` 元件，支援拖放上傳 PDF 並即時預覽解析結果。

### 🐛 錯誤修復 (Fixed)
*   **部署**: 修復 Vercel 部署時的 404 錯誤。
    *   新增 `vercel.json` 設定路由重寫 (Rewrites)。
    *   新增 `api/index.py` 作為 Serverless Function 入口點。
    *   新增根目錄 `requirements.txt` 以符合 Vercel Python Runtime 要求。

## [0.1.0] - 2026-01-13

### 🎉 初始發布 (Initial Release)
*   建立專案骨架 (Project Skeleton)。
*   整合 Vite + React 前端架構 (繁體中文介面)。
*   整合 FastAPI 後端架構。
*   完成 GitHub 基礎部署設定。
