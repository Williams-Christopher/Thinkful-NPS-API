// listen for click
// get values from the form
// generate query parameters
// submit query to api
// determine success or failure
// append the ul with list items containing the api results

let apiKey = 'as1AhtCZOZ0TGpPXXqvDrdXEi3LHfvdwsokJOb8u';
let baseUrl = 'https://developer.nps.gov/api/v1/parks';

function displayResults (responseJson) {
    $('#js-status-text').text('Search results:').addClass('success-text');
    console.log(responseJson);
}

function displayError(e) {
    $('#js-status-text').text(`An error occurred: ${e.message}`).addClass('error-text');
}

function clearDisplayArea() {
    $('#js-status-text').empty().removeClass('error-text','success-text');
    $('#js-results').empty();
}

function makeAPIRequest(queryString) {
    let url = baseUrl + '?' + queryString;
    // make async request
    // display result or error
    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(e => displayError(e));
}

function generateQueryString(searchTerm, searchMaxResults = 10) {
    let queryString = `api_key=${apiKey}&stateCode=${encodeURIComponent(searchTerm)}&limit=${searchMaxResults}`
    //console.log(queryString);
    makeAPIRequest(queryString);
}

function handleSubmit(){
    $('form').submit ( event => {
        event.preventDefault();
        let searchTerm = $('#js-search-states').val();
        let searchMaxResults = $('#js-search-max-results').val();

        clearDisplayArea();

        generateQueryString(searchTerm, searchMaxResults);
    });
}

function createSelectOptions() {
    let stateCodes = Object.keys(us_states);
    stateCodes.forEach(sc => {
        $('#js-search-states').append(
            `<option value="${sc}">${us_states[sc]}</option>`
        )
    });
}

$(function() {
    // Create options elements for the all the states in us_states.js
    createSelectOptions();
    // Listen for submit event
    handleSubmit();
});