// listen for click
// get values from the form
// generate query parameters
// submit query to api
// determine success or failure
// append the ul with list items containing the api results

let apiKey = 'as1AhtCZOZ0TGpPXXqvDrdXEi3LHfvdwsokJOb8u';
let baseUrl = 'https://developer.nps.gov/api/v1';

// function displayResults () {

// }

// function callApi(queryString) {

// }

// function generateQueryString(searchTerm, searchMaxResults = 10) {
    
// }

function handleClick(){
    $('form').submit ( event => {
        event.preventDefault();
        let searchTerm = $('#js-search-states').val();
        let searchMaxResults = $('#js-search-max-results').val();
        console.log(`${searchTerm}`);
        //generateQueryString(searchTerm, searchMaxResults);
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
    createSelectOptions();
    handleClick();
});