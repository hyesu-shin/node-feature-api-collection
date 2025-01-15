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

      // Base URL 교체
      postmanCollection.variable = [
        {
          "key": "base_url",
          "value": "https://dev-api.inmyhands.site"
        }
      ];
      // console.log('The collection object is: ', postmanCollection);

      postmanCollection.collection.item.forEach((item) => {
        if (item.request && item.request.url && item.request.url.raw) {
          item.request.url.raw = `{{base_url}}${item.request.url.raw.replace(/^https?:\/\/[^/]+/, '')}`;
        }
      });

      fs.writeFileSync(path.join(__dirname, 'postman-output.json'), JSON.stringify(postmanCollection, null, 2), 'utf-8');
      console.log('Postman collection has been saved to postman-output.json');
    }
  }
);