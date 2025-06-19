Buffer in NodeJS

	It is just a typedArray of Uint8array, which has extra properties and methods provided by NodeJS
	We globally get access of Buffer keyword in NodeJS, but not in browser
	Using Buffer with `new Buffer()` is deprecated for security reasons
	If we are not getting suggestion of methods and properties, we can do 2 things: `import {Buffer} from 'buffer'` OR `npm i @types/node -D`
	But Node JS Suggest the importing way

	Buffer.alloc(size) -> Creates an empty Buffer of give size
	behind the scenes it take given size bytes only for array buffer

	BUffer.from(ArrayBuffer/String/Array) -> Creates buffer
	behind the scenes it take more size of bite than require.

	Uint8Array .toString() Method doesn't provide the actual data
	Buffer .toString() Method provide the actual data