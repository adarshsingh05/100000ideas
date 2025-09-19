# Database Seeding Guide

## Quick Start

### 1. Clear Database and Seed New Data

```bash
npm run seed
```

### 2. Verify Seeded Data

```bash
npm run verify
```

## What Gets Created

### ✅ **6 Community Ideas** (User-uploaded)

- AI-Powered Personal Fitness Coach App
- Sustainable Packaging Solutions for E-commerce
- Virtual Reality Real Estate Tours
- Local Food Delivery from Home Chefs
- Smart Home Energy Management System
- Online Learning Platform for Traditional Crafts

### ✅ **5 Admin Ideas** (Curated)

- Groundnut Oil Processing Unit
- Organic Vegetable Farming with Hydroponics
- E-commerce Platform for Handicrafts
- Solar Panel Installation and Maintenance Service
- Mobile App Development Agency

## Features

- ✅ **Complete data structure** - All required fields populated
- ✅ **Realistic data** - Professional descriptions and investment ranges
- ✅ **Proper categorization** - Ideas across different categories
- ✅ **Admin vs Community** - Clear distinction using `isAdmin` and `isStaticIdea` fields
- ✅ **Featured ideas** - Admin ideas marked as featured
- ✅ **View and like counts** - Realistic engagement metrics
- ✅ **Tags and metadata** - Proper tagging for search and filtering

## ⚠️ Important Notes

- **This will DELETE ALL EXISTING IDEAS** before creating new ones
- Make sure your database connection is working
- All scripts use ES6 imports only
- Scripts are compatible with the existing MongoDB schema

## Troubleshooting

If you encounter issues:

1. Check your database connection
2. Verify environment variables are set
3. Run `npm run verify` to check the results
4. Check console output for detailed error messages

