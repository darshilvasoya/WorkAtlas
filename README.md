# WorkAtlas – Explore verified local businesses across India

## 🔍 What is the problem?

Finding local businesses and companies across Indian cities is often frustrating. There's no centralized, clean, or category-wise platform to:

- Discover nearby IT companies, digital agencies, or service providers
- View verified business information with location
- Filter by city, category, or search intelligently
- Visualize location dynamically on a map

Most listings are either outdated, filled with ads, or hard to filter.

---

## ✅ Solution: **WorkAtlas**

**WorkAtlas** is a modern web-based app that lets users explore verified businesses across India.

### Key Features:
- 📍 View real companies across Indian cities
- 🔎 Smart search and category filters
- 🗺️ Interactive map with dynamic location (Google Maps / Leaflet)
- 💡 Dark mode toggle for UI preference
- 🧩 Responsive layout for all devices
- ⚙️ Scraped data is dynamically imported

---

## 🛠️ How it works

### 🔗 1. **Scraper (Playwright + Node.js)**
We use a custom-built scraper that:
- Opens Google Maps in a browser (via Playwright)
- Extracts **name, category, phone, address, website**
- Dynamically parses **city name**
- Automatically fetches **latitude and longitude**
- Avoids duplicates based on company name + address or website
- Stores data in: `shared/company-basic.json`

### 🚀 2. **Backend (Laravel API)**
- Laravel handles API endpoints:
  - `/companies` (with filter support)
  - `/cities` and `/categories` (for dropdown filters)
  - `/import-companies` (for dynamic JSON import)
- Stores all data in MySQL including lat/lng

### 💻 3. **Frontend (React + Vite + Tailwind)**
- Filters, company cards, and map rendering
- Responsive UI with category & city filters
- Theme toggle (light/dark)
- Real-time display from backend

---

## 🌐 Use Cases

- 🧑‍💼 Job seekers looking for companies by city or type
- 📍 People wanting to explore tech businesses in their city
- 🧭 Local search without relying on spammy directories
- 🗺️ Easily see business on an actual map

---

## 📦 Folder Structure
---
WorkAtlas/

├── frontend/ → React + Tailwind (UI)

├── backend/ → Laravel API

├── scraper/ → Playwright scraper for Google Maps

├── shared/ → JSON data store (scraped output)

---

## 🚧 Future Scope

- Add bookmarking/favorites (local or login)
- Auto scrape new entries weekly
- Search by tags, keywords, or services
- Admin panel to moderate listings

Created by Darshil Vasoya,
for reach-out : workmail.darsh@gmail.com

>>>>>>> 2ba7a70c36aa554b1011ac767052d120b2ef71a8
