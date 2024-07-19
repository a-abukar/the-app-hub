const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/apps/calculator/calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/calculator/calculator.html'));
});

app.get('/apps/chmod_calculator/chmod_calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/chmod_calculator/chmod_calculator.html'));
});

app.get('/apps/chmod_calculator/chmod_styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/chmod_calculator/chmod_styles.css'));
});

app.post('/calculate-chmod', (req, res) => {
  const data = req.body;
  console.log(`Received data: ${JSON.stringify(data)}`);

  const pythonProcess = spawn('python3', ['public/apps/chmod_calculator/chmod_calculator.py']);

  let resultData = '';
  let errorData = '';

  pythonProcess.stdin.write(JSON.stringify(data));
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      res.status(500).json({ error: errorData });
    } else {
      try {
        const resultJson = JSON.parse(resultData);
        console.log(`Python stdout: ${resultData}`);
        res.setHeader('Content-Type', 'application/json');
        res.json(resultJson);
      } catch (err) {
        console.error(`Error parsing JSON: ${err}`);
        res.status(500).json({ error: 'Error parsing JSON from Python script' });
      }
    }
  });
});

app.get('/apps/subnet_calculator/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/subnet_calculator/index.html'));
});

app.get('/apps/subnet_calculator/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/subnet_calculator/styles.css'));
});

app.get('/apps/subnet_calculator/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/subnet_calculator/script.js'));
});

app.post('/calculate-subnet', (req, res) => {
  const { network, subnetMask } = req.body;
  const pythonProcess = spawn('python3', ['public/apps/subnet_calculator/subnet_calculator.py']);

  pythonProcess.stdin.write(JSON.stringify({ network, subnetMask }));
  pythonProcess.stdin.end();

  let resultData = '';
  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      res.status(500).send('Error calculating subnet');
    } else {
      res.json(JSON.parse(resultData));
    }
  });
});

// job tracker app

app.get('/apps/job_tracker_pro/job_tracker_pro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/job_tracker_pro/job_tracker_pro.html'));
});

app.get('/apps/job_tracker_pro/job_tracker_pro_styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/job_tracker_pro/job_tracker_pro_styles.css'));
});

app.get('/apps/job_tracker_pro/job_tracker_pro.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/job_tracker_pro/job_tracker_pro.js'));
});

// how to add app

app.get('/apps/how_to_add_app/how_to_add_app.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/how_to_add_app/how_to_add_app.html'));
});

app.get('/apps/how_to_add_app/how_to_add_app_styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/how_to_add_app/how_to_add_app_styles.css'));
});

app.get('/apps/how_to_add_app/how_to_add_app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/apps/how_to_add_app/how_to_add_app.js'));
});



app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
