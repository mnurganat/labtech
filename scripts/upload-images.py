#!/usr/bin/env python3
"""
Скачивает все фото товаров с labtech.kz и загружает в Supabase Storage.
Обновляет supabase-seed.sql с новыми URL-ами.
"""

import re
import os
import time
import requests
from pathlib import Path
from urllib.parse import urlparse

SUPABASE_URL = "https://juxtxmfgdpdoewbqrhlo.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eHR4bWZnZHBkb2V3YnFyaGxvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjUyMDEwMCwiZXhwIjoyMDkyMDk2MTAwfQ.5mOMONmvWE41UOpVaCddN6bDeZ6aKroRhRKG1oZsHKU"
BUCKET = "products"
SEED_FILE = Path(__file__).parent.parent / "supabase-seed.sql"

HEADERS = {
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "apikey": SERVICE_ROLE_KEY,
}

def create_bucket():
    """Создаёт bucket если не существует."""
    r = requests.post(
        f"{SUPABASE_URL}/storage/v1/bucket",
        headers={**HEADERS, "Content-Type": "application/json"},
        json={"id": BUCKET, "name": BUCKET, "public": True},
    )
    if r.status_code in (200, 201):
        print(f"✓ Bucket '{BUCKET}' создан")
    elif r.status_code == 409:
        print(f"✓ Bucket '{BUCKET}' уже существует")
    else:
        print(f"⚠ Bucket: {r.status_code} {r.text}")

def extract_image_urls(seed: str) -> list[str]:
    """Извлекает все уникальные URL изображений из seed файла."""
    urls = re.findall(r"'(https://www\.labtech\.kz/[^']+)'", seed)
    return list(dict.fromkeys(urls))  # уникальные, порядок сохранён

def filename_from_url(url: str) -> str:
    """Генерирует имя файла из URL."""
    path = urlparse(url).path
    return path.lstrip("/").replace("/", "__")

def download_image(url: str):
    """Скачивает изображение."""
    try:
        r = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200:
            return r.content
        print(f"  ✗ Ошибка скачивания {r.status_code}: {url}")
        return None
    except Exception as e:
        print(f"  ✗ {e}: {url}")
        return None

def upload_to_supabase(filename: str, data: bytes, content_type: str):
    """Загружает файл в Supabase Storage, возвращает публичный URL."""
    r = requests.post(
        f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{filename}",
        headers={**HEADERS, "Content-Type": content_type, "x-upsert": "true"},
        data=data,
    )
    if r.status_code in (200, 201):
        return f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{filename}"
    print(f"  ✗ Upload failed {r.status_code}: {r.text[:100]}")
    return None

def content_type(filename: str) -> str:
    ext = filename.rsplit(".", 1)[-1].lower()
    return {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
            "webp": "image/webp", "svg": "image/svg+xml"}.get(ext, "image/jpeg")

def main():
    seed = SEED_FILE.read_text()
    urls = extract_image_urls(seed)
    print(f"Найдено {len(urls)} уникальных изображений\n")

    create_bucket()
    print()

    url_map = {}  # old_url → new_url

    for i, url in enumerate(urls, 1):
        filename = filename_from_url(url)
        print(f"[{i}/{len(urls)}] {filename[:60]}...")

        data = download_image(url)
        if not data:
            continue

        ct = content_type(filename)
        new_url = upload_to_supabase(filename, data, ct)
        if new_url:
            url_map[url] = new_url
            print(f"  ✓ Загружено")

        time.sleep(0.1)  # небольшая пауза

    print(f"\n✓ Загружено {len(url_map)}/{len(urls)} изображений")

    # Обновляем seed файл
    updated_seed = seed
    for old_url, new_url in url_map.items():
        updated_seed = updated_seed.replace(f"'{old_url}'", f"'{new_url}'")

    SEED_FILE.write_text(updated_seed)
    print(f"✓ Seed файл обновлён: {SEED_FILE.name}")
    print(f"\nГотово! Теперь запусти seed в Supabase SQL Editor.")

if __name__ == "__main__":
    main()
