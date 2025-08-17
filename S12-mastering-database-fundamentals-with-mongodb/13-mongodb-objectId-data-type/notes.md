# ObjectId DataType in MongoDB

- **Size**: `ObjectId` is **12 bytes** (represented as a 24-character hexadecimal string).  
- **Structure**:
  - **4 bytes** → Timestamp (creation time).  
  - **5 bytes** → Machine information (unique per machine).  
  - **3 bytes** → Counter (for uniqueness across same machine and time).  

- **Purpose**: Ensures **global uniqueness** of `_id` across documents.  

- **Behavior**:
  - You can manually override the `_id` field.  
  - If `_id` is **not provided**, MongoDB automatically generates an `ObjectId`.  
