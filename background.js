let intervalId = null;
let seenProducts = new Set();
let url2 =""; 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'start') {
    url2 = message.url;
    const interval = message.interval * 1000; // Saniyeden milisaniyeye çevir
    if (intervalId) clearInterval(intervalId); // Önceki interval'i temizle
    intervalId = setInterval(checkProducts, interval);
  } else if (message.command === 'stop') {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }
});

async function checkProducts() {
  const tab = await chrome.tabs.create({ url: url2, active: false });
  console.log(url2)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeProducts,
  }, (results) => {
    if (results && results[0] && results[0].result) {
      const products = results[0].result;
      products.forEach(product => {
        if (!seenProducts.has(product.link)) {
          seenProducts.add(product.link);
          chrome.tabs.create({ url: product.link, active: false});
        }
      });
    }
    chrome.tabs.remove(tab.id); // Geçici sekme kapatılır
  });
}

function scrapeProducts() {
  const products = [];
  const productElements = document.querySelectorAll('.Product_product__bI6Qj');
  productElements.forEach(product => {
    const productContainer = document.querySelector('.Product_gotoBuy__HGaEw'); 
    const link = productContainer.querySelector('a')?.href;
    if (link) {
      products.push({ link });
    }
  });
  return products;
}

