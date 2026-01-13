import React, { useState, useRef } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null); // idle, uploading, success, error
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleFile = async (file) => {
        if (file.type !== 'application/pdf') {
            alert('請上傳 PDF 格式的檔案');
            return;
        }

        setUploadStatus('uploading');
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Assuming Vite proxy redirects /api to backend
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResult(response.data);
            setUploadStatus('success');
        } catch (error) {
            console.error("Upload error:", error);
            setResult({
                status: 'error',
                message: error.response?.data?.detail || '上傳失敗，請檢查後端連線'
            });
            setUploadStatus('error');
        }
    };

    return (
        <div>
            <div
                className={`upload-container ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="file-input"
                    accept=".pdf"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
                <div className="upload-icon">📄</div>
                <div className="upload-text">點擊或拖曳 PDF 財報至此</div>
                <div className="upload-subtext">支援 401 報表、損益表 (最大 10MB)</div>
            </div>

            {uploadStatus === 'uploading' && (
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                    正在解析文件...
                </div>
            )}

            {result && (
                <div className="upload-result">
                    <div className="result-header">
                        <strong>{result.filename || '解析結果'}</strong>
                        <span className={`status-badge ${result.status === 'success' ? 'status-success' : 'status-error'}`}>
                            {result.status?.toUpperCase() || 'ERROR'}
                        </span>
                    </div>
                    <div>{result.message}</div>
                    {result.content_preview && (
                        <div style={{ marginTop: '1rem' }}>
                            <small style={{ color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                                內容預覽 (前 {result.content_length} 字元):
                            </small>
                            <div className="content-preview">
                                {result.content_preview}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
