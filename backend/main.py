from typing import Union

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from util import is_valid_url
from datetime import datetime

import crud
from database import SessionLocal, engine

from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Convert_OriginalURL_Request_Body(BaseModel):
    original_url: str

@app.get("/{shorten_url}", description="Get the original URL by providing a shortened URL") # get original url by shorten url
def get_original_url(shorten_url: str, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host # Retrieve the client's IP address
    result = crud.get_original_url(db, shorten_url=shorten_url)
    
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    crud.create_access_record(db, shorten_url=shorten_url, ip_addr=client_ip, access_time=current_time)

    if result == None:
        raise HTTPException(status_code=404, detail="Shortened URL not Found")
    
    return RedirectResponse(url=result.original_url)

@app.post("/s/", description="Generate a shortened URL for the given original URL") # generate shorten url by given original url
async def gen_shorten_url(request_body: Convert_OriginalURL_Request_Body, db: Session = Depends(get_db)):
    if not is_valid_url(request_body.original_url):
        raise HTTPException(status_code=500, detail="Invalid URL")

    return crud.create_shorten_url_mapping(db, original_url=request_body.original_url)

@app.get("/log/{shorten_url}", description="Get the access log of the corresponding shortened URL")
def get_access_record(shorten_url: str, db: Session = Depends(get_db)):
    result = crud.get_access_record(db, shorten_url=shorten_url)

    if result == [] or result == None:
        raise HTTPException(status_code=404, detail="Record not Found")
    
    return result
