from typing import Union

from fastapi import Depends, FastAPI
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
def read_root():
    return "URL shortener"

class Convert_OriginalURL_Request_Body(BaseModel):
    original_url: str

@app.post("/s/", description="Generate a shorten URL for the given original URL") # generate shorten url by given original url
async def gen_shorten_url(request_body: Convert_OriginalURL_Request_Body, db: Session = Depends(get_db)):
    return crud.create_shorten_url_mapping(db, original_url=request_body.original_url)

@app.get("/g/{shorten_url}", description="Get the original URL by providing a shorten URL") # get original url by shorten url
def get_original_url(shorten_url: str, db: Session = Depends(get_db)):
    original_url = crud.get_original_url(db, shorten_url=shorten_url).original_url
    return RedirectResponse(url=original_url)