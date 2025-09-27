import mongoose from "mongoose";
import { connectDB } from "../src/lib/database.js";
import Idea from "../src/lib/models/Idea.js";

// Database seeding script
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to database
    await connectDB();
    console.log("✅ Connected to database");

    // Clear all existing ideas
    console.log("🗑️ Clearing all existing ideas...");
    const deleteResult = await Idea.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing ideas`);

    // Sample community ideas (6 ideas)
    const communityIdeas = [
      {
        title: "AI-Powered Personal Fitness Coach App",
        description:
          "A mobile application that uses artificial intelligence to create personalized workout plans, track progress, and provide real-time coaching based on user's fitness goals, body type, and available equipment.",
        category: "Technology",
        investmentRange: "₹1-5 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Fitness enthusiasts, gym-goers, and people looking to start their fitness journey",
        keyFeatures: [
          "AI-powered workout generation",
          "Progress tracking and analytics",
          "Real-time form correction",
          "Nutrition guidance integration",
          "Social features and challenges",
        ],
        businessModel: "SaaS (Software as a Service)",
        revenueStreams: [
          "Monthly subscription fees",
          "Premium features",
          "In-app purchases",
        ],
        competitiveAdvantage:
          "Advanced AI algorithms that adapt to user behavior and provide more accurate recommendations than generic fitness apps",
        challenges:
          "High development costs, need for fitness expertise, competition with established players",
        marketSize: "National",
        requiredSkills: [
          "Mobile app development",
          "AI/ML expertise",
          "Fitness knowledge",
          "UI/UX design",
          "Data analytics",
        ],
        contactInfo: {
          email: "john.doe@example.com",
          phone: "+91-9876543210",
        },
        imageUrl: "/demo1.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "john.doe@example.com",
        uploadedByName: "John Doe",
        tags: ["AI", "Fitness", "Mobile App", "Health Tech"],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 156,
        likes: 23,
      },
      {
        title: "Sustainable Packaging Solutions for E-commerce",
        description:
          "Eco-friendly packaging alternatives for online retailers, including biodegradable materials, reusable containers, and innovative designs that reduce environmental impact while maintaining product protection.",
        category: "Manufacturing",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "E-commerce businesses, online retailers, environmentally conscious brands",
        keyFeatures: [
          "Biodegradable materials",
          "Custom packaging design",
          "Bulk ordering system",
          "Environmental impact tracking",
          "Cost-effective solutions",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Product sales",
          "Custom design services",
          "Consulting fees",
          "Bulk supply contracts",
        ],
        competitiveAdvantage:
          "Focus on sustainability with competitive pricing and innovative materials that meet international environmental standards",
        challenges:
          "Higher material costs, need for certifications, educating customers about benefits",
        marketSize: "International",
        requiredSkills: [
          "Manufacturing expertise",
          "Environmental science knowledge",
          "Supply chain management",
          "Sales and marketing",
          "Quality control",
        ],
        contactInfo: {
          email: "sarah.green@example.com",
          phone: "+91-9876543211",
        },
        imageUrl: "/demo2.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "sarah.green@example.com",
        uploadedByName: "Sarah Green",
        tags: ["Sustainability", "E-commerce", "Manufacturing", "Eco-friendly"],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 89,
        likes: 15,
      },
      {
        title: "Virtual Reality Real Estate Tours",
        description:
          "Immersive VR experiences for real estate viewing, allowing potential buyers to explore properties remotely with realistic 3D environments, virtual staging, and interactive features.",
        category: "Real Estate",
        investmentRange: "₹10-25 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "Real estate agents, property developers, home buyers, and investors",
        keyFeatures: [
          "360-degree property tours",
          "Virtual staging capabilities",
          "Interactive floor plans",
          "AR integration",
          "Mobile and VR headset compatibility",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Per-tour pricing",
          "Monthly subscriptions",
          "Custom development",
          "Equipment sales",
        ],
        competitiveAdvantage:
          "Cutting-edge VR technology with user-friendly interface and comprehensive property visualization features",
        challenges:
          "High initial investment, need for specialized equipment, training requirements for users",
        marketSize: "National",
        requiredSkills: [
          "VR/AR development",
          "3D modeling",
          "Real estate knowledge",
          "Photography/videography",
          "Business development",
        ],
        contactInfo: {
          email: "mike.chen@example.com",
          phone: "+91-9876543212",
        },
        imageUrl: "/demo3.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "mike.chen@example.com",
        uploadedByName: "Mike Chen",
        tags: ["VR", "Real Estate", "Technology", "3D Modeling"],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 203,
        likes: 31,
      },
      {
        title: "Local Food Delivery from Home Chefs",
        description:
          "A platform connecting home-based chefs with local customers, enabling people to order authentic homemade meals while providing income opportunities for talented home cooks.",
        category: "Food & Beverage",
        investmentRange: "₹1-5 Lakhs",
        timeToStart: "1-3 months",
        targetAudience:
          "Food lovers, home chefs, busy professionals, and families seeking authentic home-cooked meals",
        keyFeatures: [
          "Chef verification system",
          "Menu customization",
          "Real-time tracking",
          "Rating and review system",
          "Payment integration",
        ],
        businessModel: "Marketplace",
        revenueStreams: [
          "Commission on orders",
          "Chef registration fees",
          "Premium listings",
          "Delivery charges",
        ],
        competitiveAdvantage:
          "Focus on authentic home-cooked meals with local flavors and personal touch that restaurants can't provide",
        challenges:
          "Food safety regulations, chef onboarding, quality control, logistics management",
        marketSize: "Local (City/Town)",
        requiredSkills: [
          "Mobile app development",
          "Food industry knowledge",
          "Logistics management",
          "Marketing and sales",
          "Customer service",
        ],
        contactInfo: {
          email: "priya.sharma@example.com",
          phone: "+91-9876543213",
        },
        imageUrl: "/demo4.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "priya.sharma@example.com",
        uploadedByName: "Priya Sharma",
        tags: ["Food Delivery", "Home Chefs", "Local Business", "Marketplace"],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 127,
        likes: 19,
      },
      {
        title: "Smart Home Energy Management System",
        description:
          "IoT-based solution that monitors and optimizes energy consumption in homes, providing real-time insights, automated controls, and cost savings through intelligent energy management.",
        category: "Energy",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "Homeowners, property managers, environmentally conscious consumers, and smart home enthusiasts",
        keyFeatures: [
          "Real-time energy monitoring",
          "Automated device control",
          "Cost optimization algorithms",
          "Mobile app interface",
          "Energy usage analytics",
        ],
        businessModel: "B2C (Business to Consumer)",
        revenueStreams: [
          "Hardware sales",
          "Software subscriptions",
          "Installation services",
          "Maintenance contracts",
        ],
        competitiveAdvantage:
          "Comprehensive energy management with user-friendly interface and significant cost savings potential",
        challenges:
          "High development costs, need for IoT expertise, market education, competition with established players",
        marketSize: "National",
        requiredSkills: [
          "IoT development",
          "Energy systems knowledge",
          "Mobile app development",
          "Hardware design",
          "Sales and marketing",
        ],
        contactInfo: {
          email: "alex.tech@example.com",
          phone: "+91-9876543214",
        },
        imageUrl: "/demo5.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "alex.tech@example.com",
        uploadedByName: "Alex Tech",
        tags: ["IoT", "Energy", "Smart Home", "Sustainability"],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 94,
        likes: 12,
      },
      {
        title: "Online Learning Platform for Traditional Crafts",
        description:
          "Digital platform preserving and teaching traditional Indian crafts through video tutorials, live workshops, and community features, connecting master craftsmen with learners worldwide.",
        category: "Education",
        investmentRange: "₹1-5 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Craft enthusiasts, students, tourists, cultural preservationists, and artisans",
        keyFeatures: [
          "Video-based learning",
          "Live workshop sessions",
          "Craft supply marketplace",
          "Community forums",
          "Certification programs",
        ],
        businessModel: "Subscription",
        revenueStreams: [
          "Course subscriptions",
          "Live workshop fees",
          "Supply sales commission",
          "Certification fees",
        ],
        competitiveAdvantage:
          "Focus on authentic traditional crafts with master craftsmen as instructors and comprehensive learning resources",
        challenges:
          "Content creation costs, instructor recruitment, technology requirements, market reach",
        marketSize: "International",
        requiredSkills: [
          "Platform development",
          "Content creation",
          "Cultural knowledge",
          "Video production",
          "Community management",
        ],
        contactInfo: {
          email: "raj.crafts@example.com",
          phone: "+91-9876543215",
        },
        imageUrl: "/demo6.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "raj.crafts@example.com",
        uploadedByName: "Raj Crafts",
        tags: [
          "Education",
          "Traditional Crafts",
          "Cultural Preservation",
          "Online Learning",
        ],
        status: "published",
        isStaticIdea: false,
        source: "user",
        views: 178,
        likes: 27,
      },
    ];

    // Sample admin ideas (5 ideas)
    const adminIdeas = [
      {
        title: "Groundnut Oil Processing Unit",
        description:
          "A comprehensive business plan for establishing a groundnut oil extraction and processing unit. This venture involves setting up machinery for oil extraction, refining, packaging, and distribution of high-quality groundnut oil for both domestic and commercial markets.",
        category: "Agriculture",
        investmentRange: "₹25-50 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "Agripreneurs, food processing companies, and investors looking for profitable agricultural ventures",
        keyFeatures: [
          "Modern oil extraction machinery",
          "Quality control systems",
          "Packaging and branding",
          "Distribution network",
          "Export potential",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Oil sales",
          "By-product sales",
          "Contract processing",
          "Export business",
        ],
        competitiveAdvantage:
          "High demand for quality cooking oil, export potential, and government support for food processing",
        challenges:
          "High initial investment, raw material procurement, quality standards compliance, market competition",
        marketSize: "National",
        requiredSkills: [
          "Food processing knowledge",
          "Agricultural expertise",
          "Quality management",
          "Marketing and sales",
          "Supply chain management",
        ],
        contactInfo: {
          email: "admin@ideaforge.com",
          phone: "+91-8000000000",
        },
        imageUrl: "/demo1.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        tags: [
          "Agriculture",
          "Food Processing",
          "Oil Extraction",
          "Manufacturing",
        ],
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
        views: 342,
        likes: 45,
      },
      {
        title: "Organic Vegetable Farming with Hydroponics",
        description:
          "Modern hydroponic farming system for growing organic vegetables year-round. This innovative approach uses nutrient-rich water solutions instead of soil, enabling higher yields, better quality produce, and sustainable farming practices.",
        category: "Agriculture",
        investmentRange: "₹10-25 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Farmers, agripreneurs, urban farmers, and health-conscious consumers",
        keyFeatures: [
          "Hydroponic growing systems",
          "Climate control technology",
          "Organic certification",
          "Direct-to-consumer sales",
          "Year-round production",
        ],
        businessModel: "B2C (Business to Consumer)",
        revenueStreams: [
          "Vegetable sales",
          "Hydroponic system sales",
          "Consulting services",
          "Training programs",
        ],
        competitiveAdvantage:
          "Higher yields, better quality, year-round production, and growing demand for organic produce",
        challenges:
          "High setup costs, technical expertise required, market education, initial investment recovery",
        marketSize: "Regional (State/Province)",
        requiredSkills: [
          "Hydroponic farming",
          "Agricultural technology",
          "Marketing and sales",
          "Business management",
          "Customer service",
        ],
        contactInfo: {
          email: "admin@ideaforge.com",
          phone: "+91-8000000000",
        },
        imageUrl: "/demo2.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        tags: ["Agriculture", "Hydroponics", "Organic Farming", "Technology"],
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
        views: 289,
        likes: 38,
      },
      {
        title: "E-commerce Platform for Handicrafts",
        description:
          "Online marketplace connecting local artisans and handicraft makers with global customers. The platform provides tools for sellers to showcase their products, manage orders, and reach international markets while preserving traditional craftsmanship.",
        category: "E-commerce",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Artisans, handicraft makers, tourists, cultural enthusiasts, and online shoppers",
        keyFeatures: [
          "Multi-vendor marketplace",
          "Payment gateway integration",
          "International shipping",
          "Quality verification",
          "Cultural storytelling",
        ],
        businessModel: "Marketplace",
        revenueStreams: [
          "Commission on sales",
          "Listing fees",
          "Premium features",
          "Shipping services",
        ],
        competitiveAdvantage:
          "Focus on authentic handicrafts, cultural preservation, and direct artisan-to-consumer connection",
        challenges:
          "Quality control, logistics management, payment processing, market reach, competition",
        marketSize: "International",
        requiredSkills: [
          "E-commerce development",
          "Cultural knowledge",
          "Logistics management",
          "Marketing and sales",
          "Customer service",
        ],
        contactInfo: {
          email: "admin@ideaforge.com",
          phone: "+91-8000000000",
        },
        imageUrl: "/demo3.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        tags: ["E-commerce", "Handicrafts", "Cultural Heritage", "Marketplace"],
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
        views: 156,
        likes: 22,
      },
      {
        title: "Solar Panel Installation and Maintenance Service",
        description:
          "Comprehensive solar energy solutions for residential and commercial properties. The business provides end-to-end services including consultation, installation, maintenance, and monitoring of solar panel systems to help customers reduce electricity costs and environmental impact.",
        category: "Energy",
        investmentRange: "₹10-25 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "Homeowners, businesses, government institutions, and environmentally conscious consumers",
        keyFeatures: [
          "Custom solar solutions",
          "Installation services",
          "Maintenance contracts",
          "Performance monitoring",
          "Government subsidy assistance",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Installation fees",
          "Equipment sales",
          "Maintenance contracts",
          "Consulting services",
        ],
        competitiveAdvantage:
          "Growing demand for renewable energy, government incentives, and comprehensive service offering",
        challenges:
          "High initial investment, technical expertise required, regulatory compliance, market competition",
        marketSize: "National",
        requiredSkills: [
          "Solar technology expertise",
          "Electrical engineering",
          "Project management",
          "Sales and marketing",
          "Customer service",
        ],
        contactInfo: {
          email: "admin@ideaforge.com",
          phone: "+91-8000000000",
        },
        imageUrl: "/demo4.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        tags: [
          "Solar Energy",
          "Renewable Energy",
          "Installation",
          "Sustainability",
        ],
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
        views: 203,
        likes: 29,
      },
      {
        title: "Mobile App Development Agency",
        description:
          "Full-service mobile application development company specializing in iOS and Android apps for startups and enterprises. The agency provides end-to-end services from concept to deployment, including UI/UX design, development, testing, and maintenance.",
        category: "Technology",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "1-3 months",
        targetAudience:
          "Startups, small businesses, enterprises, and entrepreneurs with app ideas",
        keyFeatures: [
          "Cross-platform development",
          "UI/UX design services",
          "Quality assurance testing",
          "App store optimization",
          "Post-launch support",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Project-based fees",
          "Hourly consulting",
          "Maintenance contracts",
          "App store revenue sharing",
        ],
        competitiveAdvantage:
          "Experienced team, modern development practices, comprehensive service offering, and competitive pricing",
        challenges:
          "Talent acquisition, project management, technology updates, market competition, client acquisition",
        marketSize: "National",
        requiredSkills: [
          "Mobile app development",
          "UI/UX design",
          "Project management",
          "Business development",
          "Quality assurance",
        ],
        contactInfo: {
          email: "admin@ideaforge.com",
          phone: "+91-8000000000",
        },
        imageUrl: "/demo5.jpeg",
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        tags: ["Mobile Apps", "Technology", "Development", "Digital Services"],
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
        views: 178,
        likes: 25,
      },
    ];

    // Insert community ideas
    console.log("👥 Creating community ideas...");
    const createdCommunityIdeas = await Idea.insertMany(communityIdeas);
    console.log(`✅ Created ${createdCommunityIdeas.length} community ideas`);

    // Insert admin ideas
    console.log("👨‍💼 Creating admin ideas...");
    const createdAdminIdeas = await Idea.insertMany(adminIdeas);
    console.log(`✅ Created ${createdAdminIdeas.length} admin ideas`);

    // Summary
    console.log("\n🎉 Database seeding completed successfully!");
    console.log(
      `📊 Total ideas created: ${
        createdCommunityIdeas.length + createdAdminIdeas.length
      }`
    );
    console.log(`👥 Community ideas: ${createdCommunityIdeas.length}`);
    console.log(`👨‍💼 Admin ideas: ${createdAdminIdeas.length}`);

    // Display created ideas
    console.log("\n📋 Created Community Ideas:");
    createdCommunityIdeas.forEach((idea, index) => {
      console.log(`${index + 1}. ${idea.title} (${idea.category})`);
    });

    console.log("\n📋 Created Admin Ideas:");
    createdAdminIdeas.forEach((idea, index) => {
      console.log(`${index + 1}. ${idea.title} (${idea.category})`);
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the seeding script
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}

export default seedDatabase;
