import { connectDB } from "./database";
import Review from "./models/Review";
import Idea from "./models/Idea";

const sampleReviews = [
  {
    ideaId: 1, // AI-Powered Personal Finance App
    reviews: [
      {
        userName: "Sarah Johnson",
        userEmail: "sarah.johnson@email.com",
        rating: 5,
        comment:
          "This is an excellent business idea! The AI-powered approach to personal finance is exactly what the market needs. The implementation plan is well thought out and the revenue model is solid. I would definitely invest in this.",
        helpful: 12,
      },
      {
        userName: "Michael Chen",
        userEmail: "michael.chen@email.com",
        rating: 4,
        comment:
          "Great concept with strong market potential. The technology requirements might be challenging, but the team requirements look realistic. The subscription model should work well for this type of service.",
        helpful: 8,
      },
      {
        userName: "Emily Rodriguez",
        userEmail: "emily.rodriguez@email.com",
        rating: 5,
        comment:
          "As someone working in fintech, I can see this idea has real potential. The regulatory challenges mentioned are valid concerns, but the success factors are well identified. The market size is impressive!",
        helpful: 15,
      },
    ],
  },
  {
    ideaId: 2, // Sustainable Food Delivery
    reviews: [
      {
        userName: "David Kim",
        userEmail: "david.kim@email.com",
        rating: 4,
        comment:
          "Sustainability is the future! This idea addresses a real need in the food delivery market. The eco-friendly approach will definitely appeal to environmentally conscious consumers.",
        helpful: 6,
      },
      {
        userName: "Lisa Wang",
        userEmail: "lisa.wang@email.com",
        rating: 5,
        comment:
          "Perfect timing for this idea. With increasing awareness about environmental issues, this business model should thrive. The implementation phases are realistic and achievable.",
        helpful: 9,
      },
    ],
  },
  {
    ideaId: 3, // Virtual Reality Fitness
    reviews: [
      {
        userName: "Alex Thompson",
        userEmail: "alex.thompson@email.com",
        rating: 3,
        comment:
          "Interesting concept, but the technology requirements might be too high for the average entrepreneur. The market is growing, but competition is fierce. Need to focus on unique features.",
        helpful: 4,
      },
      {
        userName: "Jessica Brown",
        userEmail: "jessica.brown@email.com",
        rating: 4,
        comment:
          "VR fitness is definitely trending! The business model looks solid and the target audience is well-defined. The challenges mentioned are realistic but manageable with the right team.",
        helpful: 7,
      },
    ],
  },
  {
    ideaId: 4, // Smart Home Automation
    reviews: [
      {
        userName: "Robert Wilson",
        userEmail: "robert.wilson@email.com",
        rating: 5,
        comment:
          "This is a fantastic business idea! Smart home technology is exploding and there's still room for innovation. The revenue streams are diverse and the market size is huge.",
        helpful: 11,
      },
      {
        userName: "Maria Garcia",
        userEmail: "maria.garcia@email.com",
        rating: 4,
        comment:
          "Great potential in the IoT space. The implementation plan is well-structured and the team requirements are reasonable. The subscription model should provide steady revenue.",
        helpful: 5,
      },
    ],
  },
  {
    ideaId: 5, // Online Learning Platform
    reviews: [
      {
        userName: "James Taylor",
        userEmail: "james.taylor@email.com",
        rating: 5,
        comment:
          "Education technology is booming! This idea has excellent potential, especially with the shift to online learning. The business model is proven and scalable.",
        helpful: 13,
      },
      {
        userName: "Amanda Lee",
        userEmail: "amanda.lee@email.com",
        rating: 4,
        comment:
          "Solid business concept with good market timing. The revenue model is clear and the implementation phases are realistic. The team requirements look achievable.",
        helpful: 8,
      },
    ],
  },
];

export async function seedReviews() {
  try {
    await connectDB();

    console.log("Starting to seed reviews...");

    for (const ideaData of sampleReviews) {
      // Find the idea in the database
      const idea = await Idea.findOne({
        title: { $regex: new RegExp(ideaData.ideaId.toString(), "i") },
      });

      if (!idea) {
        console.log(`Idea with ID ${ideaData.ideaId} not found, skipping...`);
        continue;
      }

      console.log(`Seeding reviews for idea: ${idea.title}`);

      for (const reviewData of ideaData.reviews) {
        // Check if review already exists
        const existingReview = await Review.findOne({
          ideaId: idea._id,
          userEmail: reviewData.userEmail,
        });

        if (!existingReview) {
          const review = new Review({
            ideaId: idea._id,
            userId: idea.uploadedBy, // Use the idea uploader as the reviewer for now
            userName: reviewData.userName,
            userEmail: reviewData.userEmail,
            rating: reviewData.rating,
            comment: reviewData.comment,
            helpful: reviewData.helpful,
            status: "approved",
          });

          await review.save();
          console.log(`Created review by ${reviewData.userName}`);
        } else {
          console.log(
            `Review by ${reviewData.userName} already exists, skipping...`
          );
        }
      }
    }

    console.log("Reviews seeding completed!");
  } catch (error) {
    console.error("Error seeding reviews:", error);
  }
}

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedReviews()
    .then(() => {
      console.log("Seeding process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding process failed:", error);
      process.exit(1);
    });
}
