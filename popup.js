document.getElementById('startButton').addEventListener('click', () => {
  const interval = parseInt(document.getElementById('interval').value, 10);
  const url = document.getElementById('messag').value;
  chrome.storage.local.set({url,interval }, () => {
    chrome.runtime.sendMessage({ command: 'start', interval , url });
    alert('Ürün takibi başlatıldı!');
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ command: 'stop' });
  alert('Ürün takibi durduruldu!');
});


