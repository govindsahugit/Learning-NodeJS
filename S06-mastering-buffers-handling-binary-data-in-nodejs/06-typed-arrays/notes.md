Typed Arrays
	
	DataView Provide full control over the byte.
	we dont have any typedArray constructor function like DataView.
	
	Typed array is the category of different arrays:
		Int8Array
		Int16Array
		Int32Array
		BigInt64Array
		
		Uint8Array
		Uint16Array
		Uint32Array
		BigUint64Array
		
		Uint8ClampedArray
		etc.
	
	8 -> Multiple of 1
	16 -> Multiple of 2
	32 -> Multiple 0f 4

	when we create an object of typedArray, we get almost all methods of array on it.
	we cannot change size of an array
	This are specific array and we can only store integer, float in it.
	
	ways of creating typedArray:
		
		1. const a = new ArrayBuffer(3)
		   const uInt8Array = new Uint8Array(a);
		   
		2. const UInt8Array = new Uint8Array(4);
	
		3. const UInt8Array = new Uint8Array([0xfe, 0x53, 0xde, 0x99]);

		4. const UInt8Array = new Uint8Array(size).fill(value);
			It will take the same value for all the bits

	Note: we can make ArrayBuffer Resizeable by passing maxByteLength in constructor.

	detached means the array buffer object is transfer to another object.
	we can do it by using object.transfer()

	Detached property and transfer is newly released and is not available in nodejs