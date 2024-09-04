import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.join(__dirname, 'data.json');

// Read data from JSON file
function readData() {
  try {
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify([]), 'utf8');
    }
    const fileData = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

// Write data to JSON file
function writeData(data) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Create (Add) a new record
export function createRecord(newRecord) {
  const data = readData();
  data.push(newRecord);
  writeData(data);
}

// Read (Get) all records
export function readRecords() {
  return readData();
}

// Update an existing record
export function updateRecord(id, updatedRecord) {
  const data = readData();
  const index = data.findIndex((record) => record.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedRecord };
    writeData(data);
  }
}

// Delete a record
export function deleteRecord(id) {
  const data = readData();
  const updatedData = data.filter((record) => record.id !== id);
  writeData(updatedData);
}
