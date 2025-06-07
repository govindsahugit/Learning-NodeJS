Alias: Bash first checks if the command matches any defined aliases.

Functions: Next, it checks if the command matches any defined shell functions.

Built-ins: Then, Bash checks if the command is a built-in shell command (like cd, echo, pwd, etc.).

Hash Table: Bash checks its hash table of previously looked-up executables to quickly locate executables.

Executable Files: Finally, it searches through the directories listed in the PATH environment variable, in the order they appear, to find an executable file matching the command name.