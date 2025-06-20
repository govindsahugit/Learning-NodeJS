Base64 Encoding
	
	Base64 is a character encoding that takes binary data and converts it to string/text. 
	It has total 64 characters (a-z, A-Z, 0-9, /, +).
	It use 6 bits only, and called as the subset of ASCII
	In browser we have few methods, 
		atob() ASCII to Binary
		btoa() Binary to ASCII
	This methods are limited, we can only pass string not actual binary data.
	It converts the given string to binary(utf-8) and binary to base64 and vice versa for other method.
	For base64 to work it need atleast 3 Byte of data, else it will add multiple zeros to fill the gap. And zeros Byte(8 Bit) will be replaced by =