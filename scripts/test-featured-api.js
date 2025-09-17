const fetch = require('node-fetch');

const testFeaturedAPI = async () => {
  try {
    console.log('🧪 Testing Featured Ideas API...');
    
    const response = await fetch('http://localhost:3001/api/ideas/featured?limit=8');
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ API Response: ${data.ideas.length} featured ideas found`);
      console.log('\n📋 Featured Ideas:');
      data.ideas.forEach((idea, index) => {
        console.log(`${index + 1}. ${idea.title} (${idea.category}) - Static: ${idea.isStaticIdea}`);
      });
    } else {
      console.log('❌ API Error:', data.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the development server is running on port 3001');
  }
};

if (require.main === module) {
  testFeaturedAPI();
}

module.exports = { testFeaturedAPI };
