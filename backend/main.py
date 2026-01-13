from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ValuSight 企業估值 API",
    description="ValuSight 企業估值平台的後端 API",
    version="0.1.0"
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import upload

app.include_router(upload.router, prefix="/api", tags=["Upload"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "ValuSight API 正在運行中"}

@app.get("/")
async def root():
    return {"message": "歡迎使用 ValuSight API。請訪問 /docs 查看 API 文件。"}
