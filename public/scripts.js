document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const apps = document.querySelectorAll('.app-card');
  apps.forEach(app => {
    const title = app.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      app.style.display = 'block';
    } else {
      app.style.display = 'none';
    }
  });
});
