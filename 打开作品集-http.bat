@echo off
cd /d "%~dp0"
echo.
echo Starting Portfolio Library server...
echo.
echo Open this address in your browser:
echo http://127.0.0.1:5178/
echo.
echo Keep this window open while viewing the page.
echo Press Ctrl+C to stop the server.
echo.
set "NODE_EXE=C:\Users\Administrator\AppData\Local\OpenAI\Codex\bin\node.exe"
if not exist "%NODE_EXE%" set "NODE_EXE=node"
"%NODE_EXE%" serve-http.mjs
pause
