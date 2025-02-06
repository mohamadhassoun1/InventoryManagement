// Initialize Supabase client
const supabaseUrl = 'https://stoggiatvunqyncmejwj.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b2dnaWF0dnVucXluY21landqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4Njc1MDUsImV4cCI6MjA1NDQ0MzUwNX0.zBH33uA9utKfmRJGbhUtdQ90SMCmSsIveM3DDQCh82U'; // Replace with your anon public key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Signup function
async function submitSignup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    alert('Signup failed: ' + error.message);
  } else {
    alert('Signup successful! Please check your email to verify.');
    window.location.href = 'login.html';
  }
}

// Login function
async function submitLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Login failed: ' + error.message);
  } else {
    alert('Login successful!');
    window.location.href = 'dashboard.html'; // Redirect to dashboard after login
  }
  // Show Add Item Page
function showAddItemPage() {
    document.getElementById('content').innerHTML = `
      <h2>Add Item</h2>
      <form id="addItemForm">
        <label for="itemName">Item Name:</label><br>
        <input type="text" id="itemName" name="itemName"><br>
        <label for="barcode">Barcode:</label><br>
        <input type="text" id="barcode" name="barcode"><br>
        <label for="expiryDate">Expiry Date:</label><br>
        <input type="date" id="expiryDate" name="expiryDate"><br><br>
        <button type="button" onclick="submitItem()">Submit</button>
      </form>
    `;
  }
  
  // Submit Item
  async function submitItem() {
    const itemName = document.getElementById('itemName').value;
    const barcode = document.getElementById('barcode').value;
    const expiryDate = document.getElementById('expiryDate').value;
  
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('items')
      .insert([
        {
          merchant_id: user.id,
          item_name: itemName,
          barcode: barcode,
          expiry_date: expiryDate
        }
      ]);
  
    if (error) {
      alert('Failed to add item: ' + error.message);
    } else {
      alert('Item added successfully!');
    }
  }
  // Show Item List Page
async function showItemListPage() {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('merchant_id', user.id);
  
    if (error) {
      alert('Failed to fetch items: ' + error.message);
      return;
    }
  
    let content = '<h2>Your Items</h2><table border="1">';
    content += '<tr><th>Item Name</th><th>Barcode</th><th>Expiry Date</th></tr>';
    data.forEach(item => {
      content += `<tr>
                    <td>${item.item_name}</td>
                    <td>${item.barcode}</td>
                    <td>${item.expiry_date}</td>
                  </tr>`;
    });
    content += '</table>';
    document.getElementById('content').innerHTML = content;
  }
}