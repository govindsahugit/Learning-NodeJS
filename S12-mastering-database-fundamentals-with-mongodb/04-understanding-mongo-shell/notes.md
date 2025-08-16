# Mongo Shell (mongosh)

Mongo Shell is a Node.js REPL (Read-Eval-Print Loop).  
Since it is based on Node.js, we can perform many Node.js operations.  

`mongosh` uses the full `node.exe` but has been modified to handle database operations.

## Difference between Node REPL and MongoSH REPL

### Node REPL
1. `undefined` is returned if there is no return value.  
2. Does not highlight the code.  
3. In case of a promise, it returns the full promise object.  
4. Cannot redeclare or redefine a `const` variable.  
5. `await` can be used in global space.  
6. `npm` can be accessed and used.  
7. No extra commands for handling databases.  
8. Use `process.exit()` to exit.  

### MongoSH REPL
1. Returns a newline character (empty line) if there is no return value.  
2. Highlights the code.  
3. In case of a promise, it returns the resolved value; highlights the error if rejected.  
4. Can redeclare or redefine a `const` variable.  
5. `await` cannot be used in global space (use an `async` function).  
6. `npm` cannot be accessed.  
7. Has extra commands for handling databases.  
8. Use the `exit` command to quit the shell.  
