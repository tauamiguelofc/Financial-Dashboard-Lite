async function loadStock() {
  const ticker = "AAPL"; // ou pega do input do usuário
  const res = await fetch(`http://localhost:3000/api/stock?ticker=${ticker}`);
  const data = await res.json();

  const series = data["Time Series (5min)"];
  if (!series) {
    document.getElementById("btc").textContent = "Erro ao carregar dados";
    return;
  }

  const labels = Object.keys(series).slice(0, 10).reverse();
  const values = labels.map(l => parseFloat(series[l]["4. close"]));

  document.getElementById("btc").textContent = `Últimos preços de ${ticker}: ${values.join(", ")}`;
}

loadStock();
