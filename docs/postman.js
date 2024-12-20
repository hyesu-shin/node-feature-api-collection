const fs = require('fs');
const path = require('path');

const Converter = require('openapi-to-postmanv2');
const openapiData = fs.readFileSync(path.join(__dirname, './swagger-output.json'), {encoding: 'UTF8'});

Converter.convert({ type: 'string', data: openapiData },
  {}, (err, conversionResult) => {
    if (!conversionResult.result) {
      console.log('Could not convert', conversionResult.reason);
    }
    else {
      const postmanCollection = {
        collection: conversionResult.output[0].data
      }
      // console.log('The collection object is: ', postmanCollection);

      fs.writeFileSync(path.join(__dirname, 'postman-output.json'), JSON.stringify(postmanCollection, null, 2), 'utf-8');
      console.log('Postman collection has been saved to postman-output.json');
    }
  }
);