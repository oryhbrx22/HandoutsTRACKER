# CYM Leaders’ Tracker 2026

A modern, responsive web-based church leadership tracker system.

## Features

### Member Portal (index.html)
- No authentication required (Name input only).
- Monthly Devotion Tracker (Calendar view).
- Meeting Attendance Tracker (End-month only).
- Mid-month and End-month submission types.
- **PWA Supported**: Installable on mobile and desktop.

### Admin Portal (admin.html)
- Password protected (default: `admin`).
- Dashboard with summary statistics.
- Detailed reports table with filtering.
- Export functionality.

## Database
Uses Trickle Database table `cym_submission`.

## Tech Stack
- React 18
- TailwindCSS
- Lucide Icons
- Chart.js