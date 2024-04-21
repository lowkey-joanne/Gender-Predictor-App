// Gender Predictor API Link/URL
const BASE_URL = `https://api.genderize.io?name=`;

// Variables to store/get values from HTML elements
const inputSearch = document.getElementById('search');
const searchBtn = document.getElementById('btnSearch');
const clearBtn = document.getElementById('btnClear');
const tbodyGender = document.getElementById('tbodyGender');

// Function to find the gender of the searched name from the API
const getSearchedGender = (name) => {
    fetch(`${BASE_URL}${name}`)
     .then(response => response.json())
     .then(json => {
        // Append the result to the table
        tbodyGender.innerHTML += `
         <tr>
           <td><a href="#">${json.name}</a></td>
           <td>${json.gender}</td>
           <td>${json.probability}</td>
           <td>
           <p class="status status-paid">${json.count}</p>
           </td>
         </tr>`;
      // Save the searched name to local storage
      localStorage.setItem('table', tbodyGender.innerHTML);
     });
};

// Retrieve saved data after refreshing or closing the page
tbodyGender.innerHTML = localStorage.getItem('table');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    checkDuplicateEntries();
});

// Event listener for the clear button
clearBtn.addEventListener('click', () => {
    if (tbodyGender.innerHTML === '') {
        alert('No data found in the table. Please perform a search.');
    } else if (confirm('Are you sure you want to clear all data?')) {
        alert('Table data cleared successfully.');
        localStorage.clear();
        inputSearch.innerText = '';
        window.location.reload();
    }
});

// Function to check for duplicate entries before searching
const checkDuplicateEntries = () => {
    let found = false;
    document.querySelectorAll("#tbodyGender td").forEach(cell => {
        if (cell.innerText === inputSearch.value) {
            found = true;
        }
    });
    if (found === true) {
        alert(`${inputSearch.value} is already searched. Please enter a new name.`);
    } else if (inputSearch.value === '') {
        alert('Please enter a name to search.');
    } else {
        getSearchedGender(inputSearch.value);
    }
};

// Event listener for input field to trigger search on Enter key press
inputSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkDuplicateEntries();
    }
});