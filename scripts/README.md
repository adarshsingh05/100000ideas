# Database Seeding Scripts

This directory contains scripts for managing the database seeding process.

## Scripts

### `seed-database.js`

Main seeding script that:

- Clears all existing ideas from the database
- Creates 6 community ideas (user-uploaded)
- Creates 5 admin ideas (curated by admin)
- Uses proper MongoDB ObjectIds and schema validation

### `run-seed.js`

Wrapper script to run the seeding process with proper error handling.

## Usage

### Option 1: Using npm scripts (Recommended)

```bash
# Run the seeding script
npm run seed

# Or use the wrapper script
npm run seed:run
```

### Option 2: Direct execution

```bash
# Run directly
node scripts/seed-database.js

# Or use the wrapper
node scripts/run-seed.js
```

## What Gets Created

### Community Ideas (6 ideas)

1. **AI-Powered Personal Fitness Coach App** - Technology
2. **Sustainable Packaging Solutions for E-commerce** - Manufacturing
3. **Virtual Reality Real Estate Tours** - Real Estate
4. **Local Food Delivery from Home Chefs** - Food & Beverage
5. **Smart Home Energy Management System** - Energy
6. **Online Learning Platform for Traditional Crafts** - Education

### Admin Ideas (5 ideas)

1. **Groundnut Oil Processing Unit** - Agriculture
2. **Organic Vegetable Farming with Hydroponics** - Agriculture
3. **E-commerce Platform for Handicrafts** - E-commerce
4. **Solar Panel Installation and Maintenance Service** - Energy
5. **Mobile App Development Agency** - Technology

## Features

- ✅ **Complete data structure** - All required fields populated
- ✅ **Realistic data** - Professional descriptions and realistic investment ranges
- ✅ **Proper categorization** - Ideas spread across different categories
- ✅ **Admin vs Community** - Clear distinction using `isAdmin` and `isStaticIdea` fields
- ✅ **Featured ideas** - Admin ideas marked as featured
- ✅ **View and like counts** - Realistic engagement metrics
- ✅ **Tags and metadata** - Proper tagging for search and filtering

## Database Schema Compliance

The script ensures all created ideas comply with the MongoDB schema:

- Required fields are populated
- Enum values are valid
- ObjectIds are properly generated
- Timestamps are automatically added
- Status is set to "published"

## Safety

⚠️ **Warning**: This script will **DELETE ALL EXISTING IDEAS** before creating new ones. Make sure to backup your data if needed.

## Troubleshooting

If you encounter issues:

1. Ensure your database connection is working
2. Check that all required environment variables are set
3. Verify that the Idea model is properly imported
4. Check the console output for detailed error messages

## Customization

To modify the seeded data:

1. Edit the `communityIdeas` and `adminIdeas` arrays in `seed-database.js`
2. Follow the same structure as existing ideas
3. Ensure all required fields are included
4. Run the script again to update the database
