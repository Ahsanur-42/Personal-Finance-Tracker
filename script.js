document.addEventListener("DOMContentLoaded", function () {
    showPage('home'); // Show Home by default

    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-menu"); // Ensure correct selection

    menuIcon.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });

    // Close menu when a link is clicked (for mobile view)
    document.querySelectorAll(".nav-menu li a").forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
        });
    });
});

// Function to switch pages
function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active", "fade-in");
        page.style.display = "none"; // Hide all pages
    });

    const activePage = document.getElementById(pageId);
    activePage.style.display = "block";
    setTimeout(() => {
        activePage.classList.add("active", "fade-in");
    }, 50);
}

// Finance logic
let transactions = [];

document.getElementById("finance-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    if (!amount || !category) return;

    const transaction = { amount, category, type, date: new Date() };
    transactions.push(transaction);

    updateSummary();
    updateRecentTransactions();
    updateHistory();

    this.reset();
});

// Update summary section
function updateSummary() {
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.querySelector("#total-income").textContent = income.toFixed(2);
    document.querySelector("#total-expenses").textContent = expense.toFixed(2);
    document.querySelector("#balance").textContent = (income - expense).toFixed(2);
}

// Update recent transactions section
function updateRecentTransactions() {
    const recent = transactions.slice(-5).reverse();
    const list = document.getElementById("recent-transactions");
    list.innerHTML = "";

    recent.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.type.toUpperCase()}: $${t.amount} - ${t.category}`;

        // Add color class
        li.classList.add(t.type);

        list.appendChild(li);
    });
}

// Update history based on selected filter
function updateHistory() {
    const filter = document.getElementById('history-filter').value;
    let filteredTransactions = transactions;

    const now = new Date();
    if (filter === 'last7') {
        filteredTransactions = transactions.filter(t => new Date(t.date) > new Date(now.setDate(now.getDate() - 7)));
    } else if (filter === 'thisMonth') {
        filteredTransactions = transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth());
    } else if (filter === 'lastMonth') {
        filteredTransactions = transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth() - 1);
    } else if (filter === 'thisYear') {
        filteredTransactions = transactions.filter(t => new Date(t.date).getFullYear() === new Date().getFullYear());
    } else if (filter === 'lastYear') {
        filteredTransactions = transactions.filter(t => new Date(t.date).getFullYear() === new Date().getFullYear() - 1);
    }

    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    filteredTransactions.reverse().forEach(t => {
        const li = document.createElement("li");
        const date = new Date(t.date).toLocaleString();
        li.textContent = `${date} - ${t.type.toUpperCase()}: $${t.amount} - ${t.category}`;

        // Add color class
        li.classList.add(t.type);

        list.appendChild(li);
    });
}

// Logout function
function logout() {
    document.getElementById("logout-modal").style.display = "flex";
}

// Close modal
function closeModal() {
    document.getElementById("logout-modal").style.display = "none";
}

// Confirm logout with a professional toast notification
function confirmLogout() {
    closeModal(); // Close the modal first
    showToast("You have been logged out successfully.");
    setTimeout(() => {
        // Redirect or clear session (Example: window.location.href = 'login.html';)
    }, 2000); // Redirect after 2 seconds
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show"); // Slide-in effect
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show"); // Slide-out effect
        setTimeout(() => toast.remove(), 300);
    }, 3000); // Hide after 3 seconds
}

// Function to create a new budget (reset all fields and show the form)
function createNewBudget() {
    // Reset the form fields
    document.getElementById('budget-amount').value = '';
    document.getElementById('budget-days').value = '7'; // Reset duration to default

    // Hide the budget box and show the form again
    document.getElementById('budget-box').style.display = 'none'; // Hide the budget box
    document.getElementById('budget-form').style.display = 'block'; // Show the form

    // Reset the current budget
    currentBudget = 0;

    // Optionally, reset other related fields (like custom days input visibility)
    document.getElementById('custom-days-input').style.display = 'none';

    // Show the budget page
    showPage('budget');
}

// Handle form submission for setting the budget
document.getElementById('budget-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const budgetAmount = parseFloat(document.getElementById('budget-amount').value);
    const budgetDuration = document.getElementById('budget-days').value;

    if (isNaN(budgetAmount) || budgetAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Display the budget box with the entered amount
    document.getElementById('display-budget-amount').textContent = `$${budgetAmount.toFixed(2)}`;
    document.getElementById('budget-box').style.display = 'block'; // Show the budget box

    // Hide the budget form after setting the budget
    document.getElementById('budget-form').style.display = 'none';

    // Set the current budget to the entered amount
    currentBudget = budgetAmount;
});

// Handle custom days visibility based on the selection
document.getElementById('budget-days').addEventListener('change', function () {
    if (this.value === 'customDays') {
        document.getElementById('custom-days-input').style.display = 'block'; // Show custom days input
    } else {
        document.getElementById('custom-days-input').style.display = 'none'; // Hide custom days input
    }
});


// This function is called when the user sets the budget
function createBudget() {
    // Get the budget value from the input (for example)
    const budgetAmount = document.getElementById("budget-input").value;

    // Check if the input is a valid number
    if (budgetAmount && !isNaN(budgetAmount)) {
        // Update the displayed budget amount
        document.getElementById("display-budget-amount").textContent = `$${parseFloat(budgetAmount).toFixed(2)}`;

        // Show the budget box after setting the budget
        document.getElementById("budget-box").style.display = "block";
    } else {
        alert("Please enter a valid budget amount.");
    }
}
