@echo off
title FIGHTER FORGE ARENA PLATFORM
echo ===================================================
echo   FIGHTER FORGE - BUILT FOR CHAMPIONS
echo ===================================================
echo Starting Fighter Forge server on http://localhost:3000 ...
timeout /t 1 /nobreak >nul
start "" http://localhost:3000
set ELECTRON_RUN_AS_NODE=1
"C:\Users\Nadeem\AppData\Local\Programs\antigravity\Antigravity.exe" server.js
pause
