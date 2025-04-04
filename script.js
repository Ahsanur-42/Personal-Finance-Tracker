// Page switching
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
}

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
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

function updateSummary() {
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.querySelectorAll("#total-income").forEach(el => el.textContent = income.toFixed(2));
    document.querySelectorAll("#total-expenses").forEach(el => el.textContent = expense.toFixed(2));
    document.querySelectorAll("#balance").forEach(el => el.textContent = (income - expense).toFixed(2));
}

function updateRecentTransactions() {
    const recent = transactions.slice(-5).reverse();
    const list = document.getElementById("recent-transactions");
    list.innerHTML = "";

    recent.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.type.toUpperCase()}: $${t.amount} - ${t.category}`;
        li.classList.add(t.type); // Add 'income' or 'expense' class
        list.appendChild(li);
    });
}

function updateHistory() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.slice().reverse().forEach(t => {
        const li = document.createElement("li");
        const date = new Date(t.date).toLocaleString();
        li.textContent = `${date} - ${t.type.toUpperCase()}: $${t.amount} - ${t.category}`;
        li.classList.add(t.type); // Add 'income' or 'expense' class
        list.appendChild(li);
    });
}

function logout() {
    alert("Logging out...");
    // Redirect or clear user session here
}


function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
}



function updateHistory() {
    const filter = document.getElementById("history-filter").value;
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    const now = new Date();
    const filtered = transactions.filter(t => {
        const date = new Date(t.date);
        switch (filter) {
            case "last7":
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(now.getDate() - 7);
                return date >= sevenDaysAgo;
            case "thisMonth":
                return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                );
            case "lastMonth":
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
                return (
                    date.getMonth() === lastMonth.getMonth() &&
                    date.getFullYear() === lastMonth.getFullYear()
                );
            case "thisYear":
                return date.getFullYear() === now.getFullYear();
            case "lastYear":
                return date.getFullYear() === now.getFullYear() - 1;
            default:
                return true;
        }
    });

    filtered.reverse().forEach(t => {
        const li = document.createElement("li");
        const date = new Date(t.date).toLocaleString();
        li.textContent = `${date} - ${t.type.toUpperCase()}: $${t.amount} - ${t.category}`;
        li.classList.add(t.type); // income/expense
        list.appendChild(li);
    });
}

showPage('home');
