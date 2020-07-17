const CSVtoJSON = require('csvtojson');
const fs = require('fs');

CSVtoJSON().fromFile('./tests_data.csv')
.then(source => { 
    console.log(source)
    let data = JSON.stringify(source, null, 2);
    fs.writeFile('test_data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
})