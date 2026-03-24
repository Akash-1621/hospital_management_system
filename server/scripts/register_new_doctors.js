const doctorsToRegister = [
  { name: 'Kavitha', email: 'kavitha@gmail.com', department: 'Cardiology', experience: '6 years', phone: '+91 97654 32100' },
  { name: 'Suman', email: 'suman@gmail.com', department: 'Neurology', experience: '9 years', phone: '+91 97654 32101' },
  { name: 'Revathi', email: 'revathi@gmail.com', department: 'Pediatrics', experience: '4 years', phone: '+91 97654 32102' },
  { name: 'Jyothi', email: 'jyothi@gmail.com', department: 'General Medicine', experience: '11 years', phone: '+91 97654 32103' },
  { name: 'Nimisha', email: 'nimisha@gmail.com', department: 'Orthopedics', experience: '7 years', phone: '+91 97654 32104' },
  { name: 'Preethi', email: 'preethi@gmail.com', department: 'ICU', experience: '13 years', phone: '+91 97654 32105' },
];

const registerDoctors = async () => {
  for (const doc of doctorsToRegister) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...doc,
          password: '1qaz7ujm',
          role: 'Doctor'
        }),
      });
      const data = await response.json();
      console.log(`Registered ${doc.name}: ${data.success ? 'Success' : 'Failed - ' + (data.message || 'unknown error')}`);
    } catch (error) {
      console.error(`Error registering ${doc.name}:`, error.message);
    }
  }
};

registerDoctors();
