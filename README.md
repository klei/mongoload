mongoload
===========

> A small and simple Mongoose model loader/initiator

## Installation

```bash
npm install mongoload
```

## Usage

**index.js**:

```javascript
var mongoload = require('mongoload'),
    mongoose = require('mongoose');

// connect mongoose as usual...

mongoload.bind(mongoose).load({pattern: __dirname + '/models/*.js'});
```

**./models/MyModel.js**:

```javascript
module.exports = function (mongoose, modelName) {
  // Define your mongoose model as usual...
  var schema = mongoose.Schema({
    name: String
  });
  // `modelName` in here will be "MyModel"
  mongoose.model(modelName, schema);
};
```

## License

MIT
