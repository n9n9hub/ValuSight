from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.pdf_parser import parse_pdf

router = APIRouter()

@router.post("/upload", summary="上傳財報 PDF")
async def upload_file(file: UploadFile = File(...)):
    """
    上傳 PDF 檔案並自動解析內容。
    目前僅回傳原始解析的一前 1000 個字元作為測試。
    """
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="僅支援 PDF 檔案格式")

    # 解析 PDF
    extracted_text = await parse_pdf(file)
    
    if not extracted_text:
        return {
            "filename": file.filename,
            "status": "warning",
            "message": "無法從 PDF 中提取文字，可能是掃描檔或加密檔。",
            "content_preview": ""
        }

    return {
        "filename": file.filename,
        "status": "success",
        "message": "解析成功",
        "content_length": len(extracted_text),
        "content_preview": extracted_text[:1000] + "..." # 預覽前1000字
    }
