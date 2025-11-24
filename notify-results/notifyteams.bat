@echo off
echo.
echo ==========================================
echo   Notifying Teams about Test Results
echo ==========================================
echo.

echo Sending test results to Teams...
npx test-results-reporter publish -c notify-results/config.json

echo.
echo ==========================================
echo   Notification sent successfully!
echo ==========================================
pause
