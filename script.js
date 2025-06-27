
let income = parseFloat(localStorage.getItem("income")) || 0;
let expenses = parseFloat(localStorage.getItem("expenses")) || 0;
let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];
let theme = localStorage.getItem("theme") || "theme-aqua";

document.body.className = theme;
document.getElementById("themeSelect").value = theme;

document.getElementById("income").innerText = income.toFixed(2);
document.getElementById("expenses").innerText = expenses.toFixed(2);

updateBudget();
renderActivity();

document.getElementById("savingsGoal").addEventListener("input", updateSavings);
document.getElementById("savingsCurrent").addEventListener("input", updateSavings);

function addEntry() {
  const amount = parseFloat(document.getElementById("amount").value);
  const label = document.getElementById("label").value || "Entry";
  const type = document.getElementById("type").value;

  if (isNaN(amount) || amount <= 0) return;

  const entryText = `${type === "income" ? "+" : "-"} $${amount.toFixed(2)} — ${label}`;
  activityLog.unshift(entryText);
  activityLog = activityLog.slice(0, 5);
  localStorage.setItem("activityLog", JSON.stringify(activityLog));

  if (type === "income") {
    income += amount;
    localStorage.setItem("income", income);
  } else {
    expenses += amount;
    localStorage.setItem("expenses", expenses);
  }

  document.getElementById("income").innerText = income.toFixed(2);
  document.getElementById("expenses").innerText = expenses.toFixed(2);

  updateBudget();
  renderActivity();

  document.getElementById("amount").value = "";
  document.getElementById("label").value = "";
}

function updateBudget() {
  const leftover = income - expenses;
  const budgetBar = document.getElementById("budgetBar");
  budgetBar.max = income;
  budgetBar.value = leftover < 0 ? 0 : leftover;

  document.getElementById("budgetLeft").innerText = leftover.toFixed(2);
  document.getElementById("budgetTotal").innerText = income.toFixed(2);
}

function renderActivity() {
  const log = document.getElementById("activityLog");
  log.innerHTML = "";
  activityLog.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    log.appendChild(li);
  });
}

function updateSavings() {
  const goal = parseFloat(document.getElementById("savingsGoal").value) || 1;
  const current = parseFloat(document.getElementById("savingsCurrent").value) || 0;
  const bar = document.getElementById("savingsBar");
  bar.max = goal;
  bar.value = current;
}

function changeTheme(newTheme) {
  document.body.className = newTheme;
  localStorage.setItem("theme", newTheme);
}
