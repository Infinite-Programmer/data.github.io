    // Function to add a new entry
    function addEntry() {
        const name = document.getElementById('nameInput').value;
        const amountSent = document.getElementById('amountSentInput').value;
        const amountReceived = document.getElementById('amountReceivedInput').value;
        const reason = document.getElementById('reasonInput').value;
  
        // Create a new entry object
        const newEntry = {
          serialNumber: '',
          date: getCurrentDate(),
          name: name,
          amountSent: amountSent,
          amountReceived: amountReceived,
          reason: reason
        };
  
        // Save the new entry to local storage
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
  
        // Clear the input fields
        document.getElementById('nameInput').value = '';
        document.getElementById('amountSentInput').value = '';
        document.getElementById('amountReceivedInput').value = '';
        document.getElementById('reasonInput').value = '';
  
        // Refresh the table with updated entries
        loadSavedEntries();
      }
  
      // Function to get the current date
      function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
  
      // Function to delete a row
      function deleteRow(button) {
        const row = button.parentNode.parentNode;
        const table = document.getElementById('entryTable').getElementsByTagName('tbody')[0];
        const rowIndex = row.rowIndex - 1;
  
        // Remove the entry from local storage
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.splice(rowIndex, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
  
        // Delete the row from the table
        table.deleteRow(rowIndex);
  
        // Update the row indexes of the remaining rows
        const rows = table.rows;
        for (let i = rowIndex; i < rows.length; i++) {
          rows[i].cells[6].innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
          rows[i].cells[0].innerHTML = i + 1;
        }
      }
  
      // Function to load saved entries on page load
      function loadSavedEntries() {
        const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  
        // Clear the table
        const table = document.getElementById('entryTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
  
        // Insert the updated entries into the table
        savedEntries.forEach(function(entry, index) {
          const newRow = table.insertRow();
  
          const cell1 = newRow.insertCell();
          const cell2 = newRow.insertCell();
          const cell3 = newRow.insertCell();
          const cell4 = newRow.insertCell();
          const cell5 = newRow.insertCell();
          const cell6 = newRow.insertCell();
          const cell7 = newRow.insertCell();
  
          cell1.innerHTML = index + 1;
          cell2.innerHTML = entry.date;
          cell3.innerHTML = entry.name;
          cell4.innerHTML = entry.amountSent;
          cell5.innerHTML = entry.amountReceived;
          cell6.innerHTML = entry.reason;
          cell7.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
        });
      }
  
      // Load saved entries on page load
      window.addEventListener('DOMContentLoaded', function() {
        loadSavedEntries();
      });
    // Function to validate number inputs
    function validateNumberInput(input) {
      const value = input.value;

      // Remove non-numeric characters from the input value
      input.value = value.replace(/[^0-9]/g, '');
    }