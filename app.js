const API_URL = 'http://localhost:5000/api/customers';
const customerForm = document.getElementById('customerForm');
const tableBody = document.getElementById('customerTableBody');

// Fetch and display customers on page load
document.addEventListener('DOMContentLoaded', fetchCustomers);

async function fetchCustomers() {
    const res = await fetch(API_URL);
    const customers = await res.json();
    tableBody.innerHTML = '';
    
    customers.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.company || 'N/A'}</td>
            <td><strong>${c.status}</strong></td>
            <td>
                <button class="btn-edit" onclick="editCustomer('${c._id}', '${c.name}', '${c.email}', '${c.phone}', '${c.company}', '${c.status}')">Edit</button>
                <button class="btn-delete" onclick="deleteCustomer('${c._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle Add or Update Submit
customerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('customerId').value;
    const customerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        status: document.getElementById('status').value
    };

    if (id) {
        // Update Action
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });
    } else {
        // Create Action
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });
    }

    customerForm.reset();
    document.getElementById('customerId').value = '';
    document.getElementById('submitBtn').innerText = 'Save Customer';
    fetchCustomers();
});

function editCustomer(id, name, email, phone, company, status) {
    document.getElementById('customerId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('company').value = company;
    document.getElementById('status').value = status;
    document.getElementById('submitBtn').innerText = 'Update Customer';
}

async function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        await fetch(`${`http://localhost:5000/api/customers`}/${id}`, { method: 'DELETE' });
        fetchCustomers();
    }
}