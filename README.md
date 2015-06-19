# futurocube-serial

Easily listen to futurocube printf with node.js


1. Install node.js for your platform.
2. open CMD & choose your working directory
3. run `npm install futurocube-serial`

## Example

```js
var fc = require("futurocube-serial");

fc.on('printf', function(data) {
	console.log(data);
});
```


## Author and licence

(c) 2015 [Pavel Zbytovský](http://zby.cz)

Licenced under MIT license.
