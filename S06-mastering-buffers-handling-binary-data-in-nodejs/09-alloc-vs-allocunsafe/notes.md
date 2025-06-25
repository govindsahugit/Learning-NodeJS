Alloc Vs AllocUnsafe 

	If we create an buffer from this 2 methods, they are same but the arrayBuffer they use behind the scenes is were the changes comes.

	if we create a buffer of 10000 Bytes,
	using Buffer.alloc() method ensure that it will give empty space with zero place holder value.
	using Buffer.allocUnsafe() method doesn't ensure that the given space will be empty only.

	So using allocUnsafe() can be risky since it can reveal some sensitive information. But it is fast as compared to alloc()

	we should only use allocUnsafe when we want to fill the data immediately