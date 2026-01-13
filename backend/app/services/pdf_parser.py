import pdfplumber
from fastapi import UploadFile

async def parse_pdf(file: UploadFile) -> str:
    """
    解析上傳的 PDF 檔案並提取文字內容。
    """
    text_content = ""
    try:
        # pdfplumber 需要讀取實體檔案或 bytes，這裡我們讀取 UploadFile 的 bytes
        file_bytes = await file.read()
        
        # 將 bytes 寫入暫存檔供 pdfplumber 讀取，或是直接用 io.BytesIO (pdfplumber 支援 file-like objects)
        from io import BytesIO
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    text_content += text + "\n"
        
        # 重置指針以便後續操作 (如果需要)
        await file.seek(0)
        
        return text_content
    except Exception as e:
        print(f"PDF Parsing Error: {e}")
        return ""
