document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const octalInput = document.getElementById('octal');
  const symbolicInput = document.getElementById('symbolic');
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  const updatePermissions = () => {
    const data = {
      owner_read: document.getElementById('owner-read').checked,
      owner_write: document.getElementById('owner-write').checked,
      owner_execute: document.getElementById('owner-execute').checked,
      group_read: document.getElementById('group-read').checked,
      group_write: document.getElementById('group-write').checked,
      group_execute: document.getElementById('group-execute').checked,
      public_read: document.getElementById('public-read').checked,
      public_write: document.getElementById('public-write').checked,
      public_execute: document.getElementById('public-execute').checked,
    };

    fetch('http://localhost:3000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error); });
      }
      return response.json();
    })
    .then(data => {
      octalInput.value = data.octal;
      symbolicInput.value = data.symbolic;
    })
    .catch(error => {
      console.error('Error:', error);
      octalInput.value = 'Error';
      symbolicInput.value = 'Error';
    });
  };

  const resetPermissions = () => {
    checkboxes.forEach(checkbox => checkbox.checked = false);
    octalInput.value = '';
    symbolicInput.value = '';
    updatePermissions();
  };

  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePermissions);
  });

  document.querySelector('button').addEventListener('click', resetPermissions);

  // Initial calculation
  updatePermissions();
});
