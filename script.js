document.getElementById("finance-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    // Create a new transaction object
    const transaction = {
        amount,
        category,
        type,
        date: new Date().toLocaleString()
    };

    // Add transaction to the list and update summary
    addTransaction(transaction);
    updateSummary(transaction);

    // Clear form
    document.getElementById("finance-form").reset();
});

let totalIncome = 0;
let totalExpenses = 0;

function addTransaction(transaction) {
    const transactionList = document.getElementById("transaction-list");

    // Create list item for each transaction
    const li = document.createElement("li");
    li.classList.add(transaction.type);

    li.innerHTML = `
        ${transaction.type === 'income' ? 'Income' : 'Expense'}: $${transaction.amount} - Category: ${transaction.category} - Date: ${transaction.date}
    `;

    transactionList.appendChild(li);
}

function updateSummary(transaction) {
    // Update income, expenses, and balance based on transaction type
    if (transaction.type === 'income') {
        totalIncome += transaction.amount;
    } else {
        totalExpenses += transaction.amount;
    }

    const balance = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = totalIncome.toFixed(2);
    document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
}
