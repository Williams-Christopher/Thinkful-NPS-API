'use strict'

let apiKey = 'as1AhtCZOZ0TGpPXXqvDrdXEi3LHfvdwsokJOb8u';
let baseUrl = 'https://developer.nps.gov/api/v1/parks';

function displayResults (json) {
    $('#js-status-text').text('Search results:').addClass('success-text');
    console.log(json);

    json.data.forEach(element => {
        let physicalAddress = parsePhysicalAddress(element.addresses);

        $('#js-results').append(
            `<li>
                <h2>${element.name}</h2>
                <p>${element.description}</p>
                <a href="https://google.com/maps/search/${physicalAddress}" target="_blank">${physicalAddress}</a>
                <a href="${element.url}" target="_blank">${element.url}</a>
            </li>`
        )
    });
}

function parsePhysicalAddress(addresses) {
    let index = 0;
    if (addresses[index].type !== 'Physical') {
        index = 1;
    }
    let address1 = addresses[index].line1;
    let address2 = addresses[index].line2 === '' ? `` : `, ${addresses[index].line2}`;
    let address3 = addresses[index].line3 === '' ? `` : `, ${addresses[index].line3}`;
    return `${address1}${address2}${address3}, ${addresses[index].city}, ${addresses[index].statecode} ${addresses[index].postalcode} `;
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
    let queryString = `api_key=${apiKey}&stateCode=${encodeURIComponent(searchTerm)}&limit=${searchMaxResults}&fields=addresses`
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