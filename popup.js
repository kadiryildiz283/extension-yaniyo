document.getElementById('startButton').addEventListener('click', () => {
  const interval = parseInt(document.getElementById('interval').value, 10);

  chrome.storage.local.set({ interval }, () => {
    chrome.runtime.sendMessage({ command: 'start', interval });
    alert('Ürün takibi başlatıldı!');
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ command: 'stop' });
  alert('Ürün takibi durduruldu!');
});
