const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const data = req.body;

  const pythonProcess = spawn('python3', [path.join(__dirname, '../apps/chmod_calculator/chmod_calculator.py')]);

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
      res.status(500).json({ error: errorData });
    } else {
      try {
        const resultJson = JSON.parse(resultData);
        res.setHeader('Content-Type', 'application/json');
        res.json(resultJson);
      } catch (err) {
        res.status(500).json({ error: 'Error parsing JSON from Python script' });
      }
    }
  });
};
