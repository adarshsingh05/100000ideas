import mongoose from "mongoose";
import Idea from "../src/lib/models/Idea.js";

// Direct database connection
const MONGODB_URI =
  "mongodb+srv://project_1:project_1@cluster0.pwx2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect directly to database
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
        ],
        businessModel: "Freemium",
        revenueStreams: [
          "Premium subscription fees",
          "In-app purchases",
          "Affiliate partnerships",
        ],
        competitiveAdvantage:
          "Advanced AI algorithms that provide personalized coaching unlike generic fitness apps",
        challenges:
          "High development costs, need for AI expertise, competition from established fitness apps",
        marketSize: "International",
        requiredSkills: [
          "Mobile app development",
          "AI/ML programming",
          "UI/UX design",
          "Fitness industry knowledge",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543210",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
      {
        title: "Eco-Friendly Packaging Solutions",
        description:
          "Manufacturing biodegradable packaging materials from agricultural waste for food and retail industries, focusing on sustainability and environmental responsibility.",
        category: "Manufacturing",
        investmentRange: "₹10-25 Lakhs",
        timeToStart: "6-12 months",
        targetAudience:
          "Food manufacturers, retail chains, e-commerce companies",
        keyFeatures: [
          "Biodegradable materials",
          "Custom packaging solutions",
          "Cost-effective production",
          "Eco-certification compliance",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Volume-based sales",
          "Custom packaging solutions",
          "Licensing agreements",
        ],
        competitiveAdvantage:
          "Local production with agricultural waste materials, reducing costs and environmental impact",
        challenges:
          "Initial setup costs, need for eco-certifications, competition from established packaging companies",
        marketSize: "National",
        requiredSkills: [
          "Manufacturing expertise",
          "Material science knowledge",
          "Business development",
          "Environmental regulations",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543211",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
      {
        title: "Smart Home Automation for Senior Citizens",
        description:
          "IoT-based home automation system specifically designed for elderly people, featuring voice control, health monitoring, and emergency response capabilities.",
        category: "Technology",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Senior citizens, their families, assisted living facilities",
        keyFeatures: [
          "Voice-controlled devices",
          "Health monitoring sensors",
          "Emergency alert system",
          "Family notification features",
        ],
        businessModel: "B2C (Business to Consumer)",
        revenueStreams: [
          "Hardware sales",
          "Subscription services",
          "Installation fees",
        ],
        competitiveAdvantage:
          "Specialized for senior citizens with simplified interface and health monitoring features",
        challenges:
          "High development costs, need for healthcare partnerships, user adoption among elderly",
        marketSize: "National",
        requiredSkills: [
          "IoT development",
          "Hardware design",
          "Healthcare knowledge",
          "User experience design",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543212",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
      {
        title: "Organic Food Delivery Service",
        description:
          "Farm-to-table organic food delivery service connecting local organic farmers directly with consumers, ensuring fresh, healthy, and sustainable food options.",
        category: "Food & Beverage",
        investmentRange: "₹1-5 Lakhs",
        timeToStart: "1-3 months",
        targetAudience: "Health-conscious consumers, organic food enthusiasts",
        keyFeatures: [
          "Direct farmer partnerships",
          "Fresh organic produce",
          "Subscription-based delivery",
          "Transparent sourcing information",
        ],
        businessModel: "Marketplace",
        revenueStreams: [
          "Commission from farmers",
          "Delivery fees",
          "Subscription fees",
        ],
        competitiveAdvantage:
          "Direct farm partnerships ensuring freshest organic produce at competitive prices",
        challenges:
          "Logistics complexity, seasonal availability, competition from established food delivery services",
        marketSize: "Regional (State/Province)",
        requiredSkills: [
          "Logistics management",
          "Agriculture knowledge",
          "Digital marketing",
          "Supply chain management",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543213",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
      {
        title: "Virtual Reality Training for Healthcare Professionals",
        description:
          "VR-based training platform for medical students and healthcare professionals, providing immersive learning experiences for surgical procedures and patient care.",
        category: "Healthcare",
        investmentRange: "₹25-50 Lakhs",
        timeToStart: "1-2 years",
        targetAudience:
          "Medical schools, hospitals, healthcare training centers",
        keyFeatures: [
          "Immersive VR training modules",
          "Realistic medical scenarios",
          "Progress tracking and assessment",
          "Multi-user collaborative training",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Licensing fees",
          "Subscription services",
          "Custom development",
        ],
        competitiveAdvantage:
          "High-fidelity medical simulations with realistic scenarios for better training outcomes",
        challenges:
          "High development costs, need for medical expertise, regulatory compliance, VR hardware requirements",
        marketSize: "International",
        requiredSkills: [
          "VR development",
          "Medical knowledge",
          "3D modeling",
          "Educational technology",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543214",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
      {
        title: "Sustainable Fashion Brand",
        description:
          "Eco-friendly fashion brand using recycled materials and sustainable manufacturing processes to create trendy clothing for environmentally conscious consumers.",
        category: "Fashion",
        investmentRange: "₹5-10 Lakhs",
        timeToStart: "3-6 months",
        targetAudience:
          "Environmentally conscious consumers, millennials, Gen Z",
        keyFeatures: [
          "Recycled material clothing",
          "Sustainable manufacturing",
          "Transparent supply chain",
          "Trendy, modern designs",
        ],
        businessModel: "B2C (Business to Consumer)",
        revenueStreams: [
          "Direct sales",
          "Retail partnerships",
          "Online marketplace",
        ],
        competitiveAdvantage:
          "Local sustainable manufacturing with transparent supply chain and trendy designs",
        challenges:
          "Higher production costs, limited sustainable material suppliers, brand building in competitive fashion market",
        marketSize: "National",
        requiredSkills: [
          "Fashion design",
          "Sustainable manufacturing",
          "Digital marketing",
          "Supply chain management",
        ],
        contactInfo: {
          email: "community@example.com",
          phone: "+919876543215",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "community@example.com",
        uploadedByName: "Community Contributor",
        status: "published",
        isStaticIdea: false,
        isAdmin: false,
        source: "user",
      },
    ];

    // Sample admin ideas (5 ideas)
    const adminIdeas = [
      {
        title: "AI-Powered Customer Service Platform",
        description:
          "Advanced AI chatbot platform that provides 24/7 customer support for businesses, with natural language processing and seamless human handoff capabilities.",
        category: "Technology",
        investmentRange: "₹25-50 Lakhs",
        timeToStart: "1-2 years",
        targetAudience: "Small to medium businesses, e-commerce companies",
        keyFeatures: [
          "Advanced NLP capabilities",
          "Multi-language support",
          "Human handoff integration",
          "Analytics and insights",
        ],
        businessModel: "SaaS (Software as a Service)",
        revenueStreams: [
          "Monthly subscriptions",
          "Enterprise licensing",
          "Custom integrations",
        ],
        competitiveAdvantage:
          "Advanced AI with seamless human handoff and multi-language support for global businesses",
        challenges:
          "High development costs, need for AI expertise, competition from established players, data privacy concerns",
        marketSize: "Global",
        requiredSkills: [
          "AI/ML development",
          "Natural language processing",
          "Software development",
          "Customer service knowledge",
        ],
        contactInfo: {
          email: "admin@1000ideas.com",
          phone: "+919876543220",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
      },
      {
        title: "Blockchain-Based Supply Chain Management",
        description:
          "Transparent and secure supply chain tracking system using blockchain technology to ensure authenticity and traceability of products from source to consumer.",
        category: "Technology",
        investmentRange: "₹50 Lakhs - 1 Crore",
        timeToStart: "More than 2 years",
        targetAudience:
          "Manufacturing companies, retail chains, logistics providers",
        keyFeatures: [
          "End-to-end traceability",
          "Smart contracts",
          "Real-time tracking",
          "Fraud prevention",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Enterprise licensing",
          "Transaction fees",
          "Custom development",
        ],
        competitiveAdvantage:
          "Blockchain-based transparency ensuring complete supply chain traceability and fraud prevention",
        challenges:
          "High development costs, blockchain expertise required, regulatory compliance, integration complexity",
        marketSize: "Global",
        requiredSkills: [
          "Blockchain development",
          "Supply chain knowledge",
          "Cryptography",
          "Enterprise software",
        ],
        contactInfo: {
          email: "admin@1000ideas.com",
          phone: "+919876543221",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
      },
      {
        title: "Renewable Energy Microgrid Solutions",
        description:
          "Smart microgrid systems that integrate solar, wind, and battery storage to provide reliable, clean energy for communities and businesses.",
        category: "Energy",
        investmentRange: "Above ₹1 Crore",
        timeToStart: "More than 2 years",
        targetAudience: "Communities, businesses, government institutions",
        keyFeatures: [
          "Multi-source energy integration",
          "Smart grid management",
          "Energy storage optimization",
          "Grid independence",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Project sales",
          "Maintenance contracts",
          "Energy trading",
        ],
        competitiveAdvantage:
          "Integrated renewable energy solutions with smart grid management for reliable clean energy",
        challenges:
          "High capital investment, regulatory approvals, technical complexity, long project timelines",
        marketSize: "Global",
        requiredSkills: [
          "Renewable energy engineering",
          "Electrical engineering",
          "Smart grid technology",
          "Project management",
        ],
        contactInfo: {
          email: "admin@1000ideas.com",
          phone: "+919876543222",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
      },
      {
        title: "Precision Agriculture IoT Platform",
        description:
          "Comprehensive IoT platform for precision agriculture that monitors soil conditions, weather, and crop health to optimize farming practices and increase yields.",
        category: "Agriculture",
        investmentRange: "₹25-50 Lakhs",
        timeToStart: "1-2 years",
        targetAudience:
          "Farmers, agricultural cooperatives, agribusiness companies",
        keyFeatures: [
          "Soil and weather monitoring",
          "Crop health analysis",
          "Automated irrigation control",
          "Yield prediction algorithms",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Hardware sales",
          "Software subscriptions",
          "Data analytics services",
        ],
        competitiveAdvantage:
          "Comprehensive IoT platform with AI-powered insights for precision agriculture and yield optimization",
        challenges:
          "High development costs, need for agricultural expertise, IoT infrastructure requirements, farmer adoption",
        marketSize: "International",
        requiredSkills: [
          "IoT development",
          "Agriculture knowledge",
          "Data analytics",
          "Hardware integration",
        ],
        contactInfo: {
          email: "admin@1000ideas.com",
          phone: "+919876543223",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
      },
      {
        title: "Telemedicine Platform for Rural Healthcare",
        description:
          "Comprehensive telemedicine platform that connects rural patients with urban specialists, providing remote consultations, diagnostics, and treatment monitoring.",
        category: "Healthcare",
        investmentRange: "₹50 Lakhs - 1 Crore",
        timeToStart: "More than 2 years",
        targetAudience:
          "Rural patients, healthcare providers, government health programs",
        keyFeatures: [
          "Video consultations",
          "Remote diagnostics",
          "Prescription management",
          "Health record integration",
        ],
        businessModel: "B2B (Business to Business)",
        revenueStreams: [
          "Subscription fees",
          "Consultation commissions",
          "Government contracts",
        ],
        competitiveAdvantage:
          "Specialized platform for rural healthcare with reliable connectivity and comprehensive medical services",
        challenges:
          "High development costs, regulatory compliance, internet connectivity issues, healthcare provider partnerships",
        marketSize: "National",
        requiredSkills: [
          "Healthcare technology",
          "Telemedicine expertise",
          "Software development",
          "Healthcare regulations",
        ],
        contactInfo: {
          email: "admin@1000ideas.com",
          phone: "+919876543224",
        },
        uploadedBy: new mongoose.Types.ObjectId(),
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        status: "published",
        isStaticIdea: true,
        isAdmin: true,
        source: "admin",
        featured: true,
      },
    ];

    // Insert community ideas
    console.log("📝 Inserting community ideas...");
    const createdCommunityIdeas = await Idea.insertMany(communityIdeas);
    console.log(`✅ Created ${createdCommunityIdeas.length} community ideas`);

    // Insert admin ideas
    console.log("📝 Inserting admin ideas...");
    const createdAdminIdeas = await Idea.insertMany(adminIdeas);
    console.log(`✅ Created ${createdAdminIdeas.length} admin ideas`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(
      `📊 Total ideas created: ${
        createdCommunityIdeas.length + createdAdminIdeas.length
      }`
    );
    console.log(`👥 Community ideas: ${createdCommunityIdeas.length}`);
    console.log(`👨‍💼 Admin ideas: ${createdAdminIdeas.length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
