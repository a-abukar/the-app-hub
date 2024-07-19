document.addEventListener('DOMContentLoaded', () => {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach((collapsible) => {
      collapsible.addEventListener('click', function () {
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          if (content.style.display === 'block') {
              content.style.display = 'none';
          } else {
              content.style.display = 'block';
          }
      });
  });

  document.getElementById('generateBtn').addEventListener('click', generateCode);
  document.querySelectorAll('.copyBtn').forEach(button => {
      button.addEventListener('click', copyToClipboard);
  });
});

function generateCode() {
  const appName = document.getElementById('appName').value.trim();
  if (!appName) {
      alert('Please enter an app name.');
      return;
  }

  const dirStructure = `
public/
apps/
  ${appName}/
    ${appName}.html
    ${appName}_styles.css
    ${appName}.js`;

  const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName.charAt(0).toUpperCase() + appName.slice(1)} App</title>
  <link rel="stylesheet" href="${appName}_styles.css">
</head>
<body>
  <div class="container">
      <h1>${appName.charAt(0).toUpperCase() + appName.slice(1)} App</h1>
      <!-- Your app content here -->
  </div>
  <script src="${appName}.js"></script>
</body>
</html>`;

  const cssCode = `
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}
.container {
  width: 80%;
  margin: 0 auto;
}`;

  const jsCode = `
document.addEventListener('DOMContentLoaded', function() {
  // Your app logic here
  console.log('${appName.charAt(0).toUpperCase() + appName.slice(1)} App Loaded');
});`;

  const serverCode = `
app.get('/apps/${appName}/${appName}.html', (req, res) => {
res.sendFile(path.join(__dirname, 'public/apps/${appName}/${appName}.html'));
});
app.get('/apps/${appName}/${appName}_styles.css', (req, res) => {
res.sendFile(path.join(__dirname, 'public/apps/${appName}/${appName}_styles.css'));
});
app.get('/apps/${appName}/${appName}.js', (req, res) => {
res.sendFile(path.join(__dirname, 'public/apps/${appName}/${appName}.js'));
});`;

  const indexCode = `
<div class="app-card">
  <img src="images/${appName}.png" alt="${appName.charAt(0).toUpperCase() + appName.slice(1)} App">
  <h3>${appName.charAt(0).toUpperCase() + appName.slice(1)} App</h3>
  <p>Manage your tasks effectively.</p>
  <button onclick="location.href='/apps/${appName}/${appName}.html'">Use app</button>
</div>`;

  document.getElementById('dirStructure').textContent = dirStructure;
  document.getElementById('htmlCode').textContent = htmlCode;
  document.getElementById('cssCode').textContent = cssCode;
  document.getElementById('jsCode').textContent = jsCode;
  document.getElementById('serverCode').textContent = serverCode;
  document.getElementById('indexCode').textContent = indexCode;
}

function copyToClipboard(event) {
  const targetId = event.target.getAttribute('data-target');
  const targetElement = document.getElementById(targetId);
  const textArea = document.createElement('textarea');
  textArea.value = targetElement.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  alert('Copied to clipboard');
}
