| **HTTP Method** | **Description**                                    | **Idempotent** | **Safe** |
| --------------- | -------------------------------------------------- | -------------- | -------- |
| **GET**         | Retrieves data from the server.                    | Yes            | Yes      |
| **POST**        | Sends data to the server to create a new resource. | No             | No       |
| **PUT**         | Updates or creates a resource at a specific URL.   | Yes            | No       |
| **DELETE**      | Deletes the specified resource from the server.    | Yes            | No       |
| **HEAD**        | Same as GET, but only retrieves headers.           | Yes            | Yes      |
| **OPTIONS**     | Describes communication options for a resource.    | Yes            | Yes      |
| **PATCH**       | Partially updates a resource at a specific URL.    | No             | No       |


#### HTTP Request Methods - Idempotency

A method is idempotent if making the same request multiple times results in the same effect as making it once.

| Method  | Idempotent | Description |
|---------|------------|-------------|
| GET     | ✓ | Doesn't change server data. Repeating gives same result. |
| HEAD    | ✓ | Like GET but without body. No side effects. |
| PUT     | ✓ | Overwrites the same resource — effect stays same. |
| DELETE  | ✓ | Deletes the same resource; further deletes have no effect. |
| OPTIONS | ✓ | Just returns info; no changes made. |
| POST    | ✗ | Creates new resources or triggers different results each time. |
| PATCH   | ✗ | Partial updates can stack or multiply effects. |