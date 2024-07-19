const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const { network, subnetMask } = req.body;
  const pythonProcess = spawn('python3', [path.join(__dirname, '../apps/subnet_calculator/subnet_calculator.py')]);

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
};
