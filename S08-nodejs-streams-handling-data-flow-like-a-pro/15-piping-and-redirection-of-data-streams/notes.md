## Piping of Data Streams

- Piping streams from the terminal works natively on Linux.
- On Windows, use WSL for piping support.
- **Piping Command:**  
    ```sh
    echo hii | node index.js
    ```
    The stdout stream of the terminal is piped to Node's stdin stream.
- Another example:  
    ```sh
    node script.js | node index.js
    ```
    Here, the stdout stream of `script.js` is piped to the stdin stream of `index.js`.
- The pipe operator is `|`.  
    It only pipes the stdout stream to the stdin stream.

---

## Redirection of Data Streams

- Redirection works by sending the output of a process to a file.
- **Command:**  
    ```sh
    node script.js > command.txt
    ```
    The stdout stream of `script.js` is stored in `command.txt`.
- To redirect the stderr stream:  
    ```sh
    node script.js 2> command.txt
    ```
    Here, `2` refers to the file descriptor for stderr.
- To write both stdout and stderr to a file:  
    ```sh
    node script.js > command.txt 2>> command.txt
    ```
- To read data from a file and pass it to a process:  
    ```sh
    node index.js < command.txt
    ```
    This reads data from `command.txt` as a stream and passes it to the stdin of `index.js`.
