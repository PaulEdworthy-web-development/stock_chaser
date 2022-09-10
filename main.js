const stockPrice = document.getElementById('ticker__company')
const btnSearch = document.getElementById('search__btn')
const table = document.getElementById('tableBody')
let ticker = document.getElementById('search__text')
let portfolioList = []

onload()

function onload() {
  console.log('Page loaded')
  if (localStorage.length > 0) {
    let portfolioList = localStorage.getItem('portfolio')
    portfolio = JSON.parse(portfolioList)
  }
}

btnSearch.addEventListener('click', function () {
  let add = ticker.value.toUpperCase()
  portfolioList.push(add)
  getData(add)
  ticker.value = ''
  console.table(portfolioList)
})

// add ticker to portfolio using "Enter" key instead of the button
ticker.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    btnSearch.click()
  }
})

async function getData(newTicker) {
  const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${newTicker}/quote`)
  const data = await response.json()
  stockPrice.textContent = newTicker + ' $' + data.latestPrice
  updatePortfolio(newTicker, data.companyName, data.latestPrice)
  localStorage.setItem('portfolio', JSON.stringify(portfolioList))
}

function updatePortfolio(symbol, name, price) {
  const row = table.insertRow()
  const cell1 = row.insertCell(0)
  const cell2 = row.insertCell(1)
  const cell3 = row.insertCell(2)
  cell1.innerHTML = name
  cell2.innerHTML = symbol
  cell3.innerHTML = price
}