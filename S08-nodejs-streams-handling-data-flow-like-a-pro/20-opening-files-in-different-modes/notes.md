## Different Modes of Opening Files

- By default, a file is opened in **read** mode.
- Syntax:
    ```js
    const fd = fs.openSync(path, mode);
    ```
- Common modes:
    - `r` &mdash; Read
    - `w` &mdash; Write (creates/truncates file)
    - `a` &mdash; Append (creates file if not exists)
    - `mode+` &mdash; Read and write (e.g., `r+`, `w+`, `a+`)
- Refer to the Node.js documentation for more details on file modes.