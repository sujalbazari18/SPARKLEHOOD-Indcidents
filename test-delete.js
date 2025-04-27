const fetch = require('node-fetch');

async function testDeleteIncident() {
  try {
    const PORT = 5000; // Correct port
    
    // Step 1: Register admin user
    console.log("1. Registering admin user...");
    const registerResponse = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'sujalbazari',
        email: 'sujal@gmail.com',
        password: 'hello',
        role: 'admin'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log("Registration response:", registerData);
    
    if (!registerResponse.ok) {
      // If registration fails, try login
      console.log("Registration failed, trying login...");
      const loginResponse = await fetch(`http://localhost:${PORT}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'sujal@gmail.com',
          password: 'hello'
        })
      });
      
      const loginData = await loginResponse.json();
      console.log("Login response:", loginData);
      
      if (!loginResponse.ok) {
        throw new Error('Failed to login');
      }
      
      var token = loginData.token;
    } else {
      var token = registerData.token;
    }
    
    // Step 2: Get all incidents to find an ID
    console.log("\n2. Fetching all incidents...");
    const incidentsResponse = await fetch(`http://localhost:${PORT}/api/incidents`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const incidentsData = await incidentsResponse.json();
    console.log("Found incidents:", incidentsData);
    
    if (!incidentsResponse.ok || !incidentsData.incidents || incidentsData.incidents.length === 0) {
      throw new Error('No incidents found to delete');
    }
    
    // Get the ID of the first incident
    const incidentId = incidentsData.incidents[0]._id;
    console.log(`Selected incident ID for deletion: ${incidentId}`);
    
    // Step 3: Delete the incident
    console.log("\n3. Deleting incident...");
    const deleteResponse = await fetch(`http://localhost:${PORT}/api/incidents/${incidentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const deleteData = await deleteResponse.json();
    console.log("Delete response:", deleteData);
    
    if (deleteResponse.ok) {
      console.log("✅ Incident successfully deleted!");
    } else {
      console.log("❌ Failed to delete incident");
    }
    
  } catch (error) {
    console.error("Error in test:", error);
  }
}

// Run the test
testDeleteIncident(); 