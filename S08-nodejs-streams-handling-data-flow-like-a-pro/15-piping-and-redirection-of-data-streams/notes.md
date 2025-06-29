Piping of Data Streams

    Piping streams from terminal will only work in linux.
    So we should WSL.

    Piping Command: echo hii | node index.js

    The stdout stream of terminal is piped to node stdin stream.

    Similarly, this example:
     node script.js | node index.js

    The stdout stream of script.js is piped to index.js stdin stream.

    pipe operator => |

    It only pipes stdout stream to stdin stream

Redirection of Data Streams

    Redirection work's with extra file, means the output of a process is stored in a file.

    Command:
        node script.js > command.txt

    Here the stdout stream of script.js is stored in command.txt

    Similarly,
        node script.js 2> command.txt
    now stderr stream of script.js is stored in command.txt

    2 is indicating the filedescriptor.

    if we want to write both we will use:
        node script.js > command.txt 2>> command.txt
    
    Now, 

    If we want to read the data of file, we can use
    commands:
        node index.js < command.txt

    It will read the data from command.txt in streams and pass it to stdin of index.js