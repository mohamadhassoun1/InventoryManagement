// Initialize Supabase client
const supabaseUrl = 'https://stoggiatvunqyncmejwj.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b2dnaWF0dnVucXluY21landqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4Njc1MDUsImV4cCI6MjA1NDQ0MzUwNX0.zBH33uA9utKfmRJGbhUtdQ90SMCmSsIveM3DDQCh82U'; // Replace with your anon public key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Signup function
async function submitSignup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Attempting to sign up:', { username, email });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    console.error('Signup failed:', error);
    alert('Signup failed: ' + error.message);
  } else {
    console.log('Signup successful:', data);
    alert('Signup successful! Please check your email to verify.');
    window.location.href = 'login.html';
  }
}

// Login function
async function submitLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Attempting to log in:', { email });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Login failed:', error);
    alert('Login failed: ' + error.message);
  } else {
    console.log('Login successful:', data);
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  }
}