from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# 將 backend 資料夾加入 Python 路徑，這樣才能 import backend 內的模組
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from app.main import app

# Vercel Serverless Function 需要一個 handler
# 但 FastAPI 可以直接作為 WSGI/ASGI app 被 Vercel 識別 (只要變數名是 app)
