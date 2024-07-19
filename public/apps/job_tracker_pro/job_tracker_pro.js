document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const table = document.getElementById('jobTable').querySelector('tbody');
    const row = document.createElement('tr');

    const columns = [
        'company', 'role', 'salary', 'link', 'date', 'contactName', 
        'contactEmail', 'contactPhone', 'response', 'stage1', 'stage2', 
        'stage3', 'stage4', 'days', 'offer', 'amount', 'negotiated'
    ];

    columns.forEach(key => {
        const cell = document.createElement('td');
        const value = formData.get(key) || 'N/A';
        if (key === 'link' && value !== 'N/A') {
            const a = document.createElement('a');
            a.href = value;
            a.textContent = 'Link';
            a.target = '_blank';
            cell.appendChild(a);
        } else {
            cell.textContent = value;
        }
        row.appendChild(cell);
    });

    table.appendChild(row);
    event.target.reset();
});

document.getElementById('downloadCsv').addEventListener('click', function() {
    const table = document.getElementById('jobTable');
    let csvContent = '';

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const cells = Array.from(row.cells).map(cell => {
            if (cell.children.length > 0) {
                return cell.children[0].href;
            } else {
                return cell.textContent;
            }
        });
        csvContent += cells.join(',') + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'job_applications.csv');
    a.click();
    URL.revokeObjectURL(url);
});
