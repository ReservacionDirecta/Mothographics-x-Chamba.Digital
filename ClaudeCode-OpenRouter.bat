@echo off
REM Claude Code via OpenRouter (gratis)
REM CCR proxy local + OpenRouter para modelos gratis
set ANTHROPIC_BASE_URL=http://127.0.0.1:3456
set ANTHROPIC_AUTH_TOKEN=test
echo Claude Code via OpenRouter (modelos gratis)
echo ANTHROPIC_BASE_URL=%ANTHROPIC_BASE_URL%
echo Modelos: nvidia/nemotron-3-ultra-550b-a55b:free, nvidia/nemotron-3-super-120b-a12b:free, google/gemma-4-31b-it:free
echo.
claude %*
