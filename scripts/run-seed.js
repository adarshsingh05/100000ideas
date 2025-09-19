import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🌱 Starting database seeding process...\n");

// Run the seeding script
const seedProcess = spawn("node", [join(__dirname, "seed-database.js")], {
  stdio: "inherit",
  shell: true,
});

seedProcess.on("close", (code) => {
  if (code === 0) {
    console.log("\n✅ Database seeding completed successfully!");
  } else {
    console.log(`\n❌ Database seeding failed with exit code ${code}`);
  }
  process.exit(code);
});

seedProcess.on("error", (error) => {
  console.error("❌ Error running seeding script:", error);
  process.exit(1);
});
