# Simple co

A simple version of generator async control flow goodness for node.js

## Usage

Completely the same as co!

## Restrictions

* Generators only
* `Promise` yields only

## Example

```javascript
co(function*(){
  try {
    const asyncResult = yield new Promise((resolve, reject) => {
      // do something
      const success = true;
      if (success) {
        resolve('Your Result');
      } else {
        reject(new Error('Your Error'));
      }
    });
    // ...
  } catch(err) {
    console.error(err);
  }
});
```