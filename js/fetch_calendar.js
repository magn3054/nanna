function fetchICSFile() {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const icsUrl = 'https://login.altiplan.dk/cal/Koldingmed33212/117011hosinfo1.ics';

    fetch(corsProxy + icsUrl)
        .then(response => response.text())
        .then(data => {
            // console.log('Fetched ICS data:', data); // For debugging
            parseICSFile(data);
        })
        .catch(error => console.error('Error fetching ICS file:', error));
}


function parseICSFile(icsData) {
    try {
        var parsed = ICAL.parse(icsData);
        var comp = new ICAL.Component(parsed);
        var events = comp.getAllSubcomponents('vevent');

        events.forEach(event => {
            let startDate = event.getFirstPropertyValue('dtstart');
            let endDate = event.getFirstPropertyValue('dtend');
            let description = event.getFirstPropertyValue('description');
            let summary = event.getFirstPropertyValue('summary');
            let uid = event.getFirstPropertyValue('uid');

            if (description && !description.trim().includes('bf')) {
                const modifiedDescription = description.replace(/\(Aendret sidst: \d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\)/, '').trim();

                console.log('UID:', uid);
                console.log('Summary:', summary);
                console.log('Description:', modifiedDescription);
                console.log('Starting:', startDate);
                console.log('Ending:', endDate);
            }
        });
    } catch (error) {
        console.error('Error displaying ICS data:', error);
    }
}

// function modifyEventData(event, startDate, endDate, description) {
//     // Example: Correct time by adding 2 hours
//     startDate.adjust(0, 0, 0, 2); // Adds 2 hours to the start time
//     endDate.adjust(0, 0, 0, 2);   // Adds 2 hours to the end time

//     // Update the event with the new times
//     event.updatePropertyWithValue('dtstart', startDate);
//     event.updatePropertyWithValue('dtend', endDate);
// }
