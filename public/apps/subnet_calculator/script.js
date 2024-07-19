document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;
  
    themeSelect.addEventListener('change', () => {
        changeTheme();
    });
  
    if (localStorage.getItem('theme')) {
        themeSelect.value = localStorage.getItem('theme');
        changeTheme();
    } else {
        body.classList.add('light-theme');
    }
  });
  
  function calculateSubnet() {
    const network = document.getElementById('network').value;
    const subnetMask = document.getElementById('subnetMask').value;
  
    fetch('/api/calculate-subnet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ network, subnetMask }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
        } else {
            resultDiv.innerHTML = `
                <p>Network Address: ${data.network_address}</p>
                <p>Broadcast Address: ${data.broadcast_address}</p>
                <p>Subnet Mask: ${data.subnet_mask}</p>
                <p>Number of Addresses: ${data.number_of_addresses}</p>
                <p>Number of Usable Addresses: ${data.number_of_usable_addresses}</p>
                <p>Usable Host Range: ${data.usable_host_range}</p>
            `;
            addToHistory(network, subnetMask, data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  
  function addToHistory(network, subnetMask, data) {
    const history = document.getElementById('history');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <p><strong>Network:</strong> ${network}</p>
        <p><strong>Subnet Mask:</strong> ${subnetMask}</p>
        <p><strong>Results:</strong></p>
        <p>Network Address: ${data.network_address}</p>
        <p>Broadcast Address: ${data.broadcast_address}</p>
        <p>Subnet Mask: ${data.subnet_mask}</p>
        <p>Number of Addresses: ${data.number_of_addresses}</p>
        <p>Number of Usable Addresses: ${data.number_of_usable_addresses}</p>
        <p>Usable Host Range: ${data.usable_host_range}</p>
    `;
    history.prepend(historyItem);
  }
  
  function copyResults() {
    const resultDiv = document.getElementById('result');
    const range = document.createRange();
    range.selectNode(resultDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
        document.execCommand('copy');
        alert('Results copied to clipboard.');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
    window.getSelection().removeAllRanges();
  }
  
  function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    localStorage.setItem('theme', theme);
    const body = document.body;
    body.className = '';
    body.classList.add(`${theme}-theme`);
  }
  