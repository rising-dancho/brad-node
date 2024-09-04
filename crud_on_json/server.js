import { createRecord, readRecords, updateRecord, deleteRecord } from './data/db.js';

// Add a new record
createRecord({ id: 1, name: 'John Doe' });

// // Get all records
// console.log(readRecords());

// // Update a record
// updateRecord(1, { name: 'Jane Doe' });

// // Delete a record
// deleteRecord(1);
