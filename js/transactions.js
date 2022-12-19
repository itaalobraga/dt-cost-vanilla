const transactionForm = selector("#transaction-form");

const tableBody = selector(".table-body");

const summaryIncomes = selector(".summary-incomes");
const summaryOutcomes = selector(".summary-outcomes");
const summaryTotal = selector(".summary-total");

const inputPrice = selector("#price");

const transactions = [];

inputPrice.addEventListener("blur", handleFormatInputValue);

function handleFormatInputValue(e) {
  const value = e.target.value.replace(",", ".");

  if (isNaN(value)) {
    return;
  }

  e.target.value = formatPrice(value);
}

function selector(element) {
  return document.querySelector(element);
}

function formatPrice(value) {
  const formattedPrice = Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedPrice;
}

transactionForm.addEventListener("submit", handleTransactionsForm);

function handleTransactionsForm(e) {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);

  const normalizedEntries = Object.fromEntries(formData.entries());

  const newTransaction = normalizedEntries;

  form.reset();

  handleCreateNewTransaction(newTransaction);
}

function handleCreateNewTransaction(newTransaction) {
  const createdAt = new Date().toLocaleDateString("pt-BR");

  const normalizedPrice = Number(
    newTransaction.price.replace(" ", "").replace("R$", "").replace(",", ".")
  );

  const normalizedTransaction = {
    ...newTransaction,
    formattedPrice: newTransaction.price,
    price: normalizedPrice,
    createdAt,
  };

  transactions.push(normalizedTransaction);

  handleListTransactions();
}

function handleListTransactions() {
  tableBody.innerHTML = ``;

  for (let transaction of transactions) {
    tableBody.innerHTML += `
        <tr>
            <td class="title">${transaction.name}</td>
            <td class=${
              transaction["transaction-type"] === "income" ? "income" : "outcome"
            }>${transaction.formattedPrice}</td>
            <td>${transaction.category}</td>
            <td>${transaction.createdAt}</td>
        </tr>
        `;
  }

  handleSummary();
}

function handleSummary() {
  const summary = {
    incomes: 0,
    outcomes: 0,
    total: 0,
  };

  summaryIncomes.textContent = "";

  for (let transaction of transactions) {
    if (transaction["transaction-type"] === "income") {
      summary.incomes += transaction.price;
      summary.total += transaction.price;
    } else {
      summary.outcomes -= transaction.price;
      summary.total -= transaction.price;
    }
  }

  summaryIncomes.textContent = formatPrice(summary.incomes);
  summaryOutcomes.textContent = formatPrice(summary.outcomes);
  summaryTotal.textContent = formatPrice(summary.total);
}

handleSummary();
