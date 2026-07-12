@echo off
title Etalase.AI - AutoPromo UMKM Server
color 0B
cls

echo ===============================================================
echo                ETALASE.AI - LOCAL DEV SERVER               
echo ===============================================================
echo.

REM Pindah ke folder tempat file bat ini berada
cd /d "%~dp0"

REM Cek apakah node_modules sudah terinstal
if exist node_modules goto check_env

echo [WARNING] Folder node_modules tidak ditemukan!
echo [INFO] Sedang memasang dependensi (npm install)...
echo.
call npm install
echo.

:check_env
REM Cek apakah .env.local sudah ada
if exist .env.local goto start_server

echo [WARNING] File .env.local belum ada! Pastikan API Key Gemini sudah diatur.
echo.

:start_server
echo [INFO] Memulai server Next.js...
echo [INFO] Browser otomatis terbuka di http://localhost:3000
echo ===============================================================
echo.

REM Membuka browser secara otomatis di background
start "" "http://localhost:3000"

REM Menjalankan npm run dev
call npm run dev

echo.
echo [INFO] Server telah berhenti atau tertutup.
pause
