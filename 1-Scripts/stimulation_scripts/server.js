/*----------------------------------------------------------------------------------------------------------
 ******************************************** Module imports ********************************************
----------------------------------------------------------------------------------------------------------*/
const http = require('http');
const fs = require('fs');
const url = require('url');

/*----------------------------------------------------------------------------------------------------------
 ******************************************** Constants ********************************************
----------------------------------------------------------------------------------------------------------*/

const ip_address = '198.245.61.139';
const open_port = 57700;
/*----------------------------------------------------------------------------------------------------------
 ******************************************** Function Definition ********************************************
----------------------------------------------------------------------------------------------------------*/
function json2csv(jsonData) {
  try {
    // Extract keys
    const keys = Object.keys(jsonData);

    // Initialize CSV string with headers
    let csv = keys.join(',') + '\n';

    // Iterate over the 'original_seq' array to determine the maximum length
    const maxOriginalSeqLength = Math.max(
      ...jsonData.original_seq.map((arr) => arr.length)
    );

    // Iterate over each 'original_seq' array and add corresponding values to CSV
    for (let i = 0; i < maxOriginalSeqLength; i++) {
      keys.forEach((key) => {
        if (Array.isArray(jsonData[key])) {
          if (jsonData[key][i]) {
            if (Array.isArray(jsonData[key][i])) {
              csv += jsonData[key][i].join(',');
            } else {
              csv += jsonData[key][i];
            }
          }
        } else {
          csv += jsonData[key];
        }
        csv += ',';
      });
      csv = csv.slice(0, -1) + '\n'; // Remove the trailing comma and add a new line
    }

    return csv;
  } catch (error) {
    console.error('Error converting JSON to CSV:', error.message);
    return;
  }
}

function convertCSV(obj) {
  // >purpose: convert a javascript object to a string with a CSV format

  //variables for the keys
  let keys = Object.keys(obj);
  let temp = [];
  let txt_keys = '';

  //variables for the values
  let values = Object.values(obj);
  let txt_values = '';

  for (let i = 0; i < keys.length; i++) {
    temp.push(keys[i]);
  }
  txt_keys = temp.join(',') + '\n';

  if (Array.isArray(obj['seq'])) {
    for (let k = 0; k < obj['seq'].length; k++) {
      for (let i = 0; i < keys.length; i++) {
        if (typeof values[i] == 'string' || typeof values[i] == 'number') {
          txt_values += `${values[i]},`;
        } else {
          txt_values += `"${values[i][k]}",`;
        }
      }
      txt_values += '\n';
    }
  } else {
    console.error("'seq' is not an array or is undefined.");
  }

  let csv = txt_keys + txt_values;

  return csv;
}

function CSV_2_obj(str_csv) {
  //temp is the number of arrays in the object
  var output = {};
  let keys = [...str_csv.trim().split('\n')[0].split(',')];
  let count = 0;
  let values = str_csv
    .trim()
    .split('\n')[1]
    .replace(/"/g, (match) => {
      count++;
      return count % 2 === 1 ? '[' : ']';
    });
  for (let key = 0; key < keys.length; key++) {
    output[`${keys[key]}`] = '';
  }
  console.log('values = ', values);
  return output;
}

function readData(participant_ID) {
  // Purpose: access the data in CSV format and convert it to a Javascript object
  fs.readFile(
    `${__dirname}/api/data_${participant_ID}.csv`,
    'utf-8',
    (err, data) => {
      if (err) {
        console.log('An error occured :', err);
      } else {
        console.log('data read');
        let read_data = data;
        let dataObj = CSV_2_obj(read_data);
        console.log(read_data);
      }
    }
  );
}

function writeData(dataObj) {
  let participant_ID = dataObj.participant_id;
  console.log('writeData got participant_id:', participant_ID);
  fs.writeFile(
    `${__dirname}/api/data_${participant_ID}.csv`,
    json2csv(dataObj),
    (err) => {
      if (err) {
        console.log('An error occured : ', err);
      } else {
        console.log('data has been written !');
      }
    }
  );
}

function writeDataJson(dataObj, participant_ID) {
  fs.writeFile(
    `${__dirname}/api/dataJSON_${participant_ID}.json`,
    dataObj,
    (err) => {
      if (err) {
        console.log('An error occured : ', err);
      } else {
        console.log('data has been written !');
      }
    }
  );
}
// writeData(my_data);
// readData(my_data.participant_id);

/*----------------------------------------------------------------------------------------------------------
 ************************************************** Server *************************************************
----------------------------------------------------------------------------------------------------------*/

const server = http.createServer();

// Create a writable stream to the log file
const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

// Function to redirect console.log to the log file
const logToFile = (message) => {
  logStream.write(`${new Date().toISOString()} - ${message}\n`);
};

// Redirect console.log to the log file
console.log = logToFile;

// Your existing server code with modifications to log to the file
server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname;

  // Enable CORS (Cross-Origin Resource Sharing)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond to preflight requests
    res.writeHead(200);
    res.end();
  } else if (
    req.method === 'POST' &&
    (pathname === '/' || pathname === '/sendData')
  ) {
    let data = '';

    req.on('data', (chunk) => {
      // Accumulate the incoming data
      data += chunk;
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('Data received:', jsonData);
        let participant_ID = jsonData.participant_id;
        writeDataJson(data, participant_ID);
        res.writeHead(200);
        res.end();
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
  } else if (
    req.method === 'POST' &&
    (pathname === '/end' || pathname === '/sendDataEnd')
  ) {
    //FIXME TODO A compléter pour ajouter les données à un grand document JSON
    res.end();
  } else {
    console.log('Request received but not processed');
    res.end();
  }
});

//TODO modfify the IP and Port to accomodate for Private UNICOG
server.listen(open_port, () => {
  console.log('Waiting for Requests...');
});
