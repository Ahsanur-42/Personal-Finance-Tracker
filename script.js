document.addEventListener("DOMContentLoaded", function () {
    showPage('home'); // Show Home by default

    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.getElementById("navMenu");

    menuIcon.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });

    // Close menu on item click (for mobile)
    document.querySelectorAll(".nav-menu li a").forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show");
        });
    });
});

// Page switching with smooth animation
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

// Mobile menu toggle
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("show");
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
        li.classList.add(t.type);
        list.appendChild(li);
    });
}

function logout() {
    alert("Logging out...");
    // Redirect or clear user session here
}
