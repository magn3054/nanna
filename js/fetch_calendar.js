function fetchICSFile() {
    fetch('https://login.altiplan.dk/cal/Koldingmed33212/117011hosinfo1.ics')
        .then(response => response.text())
        .then(data => {
            // Pass the data to the next function for parsing
            parseICSFile(data);
        })
        .catch(error => console.error('Error fetching ICS file:', error));
}


function parseICSFile(icsData) {
    var parsed = ICAL.parse(icsData);
    var comp = new ICAL.Component(parsed);
    var events = comp.getAllSubcomponents('VEVENT');

    events.forEach(event => {
        let startDate = event.getFirstPropertyValue('DTSTART');
        let endDate = event.getFirstPropertyValue('DTEND');
        let description = event.getFirstPropertyValue('DESCRIPTION');

        console.log('Event: ', description);
        console.log('Starting: ', description);
        console.log('Ending: ', description);

        // Apply necessary modifications here
        // modifyEventData(event, startDate, endDate, summary);
    });
}
