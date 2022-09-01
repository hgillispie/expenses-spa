(async function() {
  const expensesCount = document.getElementById('expenses-count');
  const expensesTotal = document.getElementById('expenses-total');
  const summary = document.getElementById('summary');

  // const response = await fetch('http://localhost:3001/');

  // const expenses = await response.json();

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    const greeting = document.getElementById('greeting');
    greeting.innerText = "Welcome back, you have 2 new expenses"
  } 
})();
