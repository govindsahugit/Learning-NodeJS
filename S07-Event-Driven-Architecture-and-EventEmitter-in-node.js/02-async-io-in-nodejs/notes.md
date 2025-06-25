Async I/O in NodeJS

    NodeJs is a single-threaded, event-driven, non-blocking, asynchronous I/O runtime that allows developers to build scalable and high-performance applications, particularly 
    suited for I/O bound tasks such as file handling and network requests.

    What exactly asynchronous I/O means ?

        Asynchronous I/O (Input/Output) refers to a programming model where input and output operations (like reading from a file, database, or making network requests) are handled without blocking the execution of the program.

        In synchronous I/O, when your program makes a request (e.g., reads a file), it waits for the operation to complete before moving on to the next line of code.

        In asynchronous I/O, the request is initiated, and then the program continues executing without waiting. Once the operation finishes, the result is delivered via a callback, Promise, or event.