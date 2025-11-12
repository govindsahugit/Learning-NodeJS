# 📁 File and Directory Path Design for Storage App

To implement breadcrumb navigation efficiently, you should store the **path in directory documents**. For files, you can dynamically derive the path using their parent directory’s path.

---

## ✅ Directory Schema Design

### 🔷 Directory Document Example:

```json
{
  "_id": ObjectId("..."),
  "name": "New Folder",
  "parentDirId": ObjectId("parent456"),
  "path": [
    ObjectId("root123"),
    ObjectId("parent456"),
    ObjectId("...")
  ],
  "size": 123456
}
```

This `path` array contains only directory IDs. It avoids duplication and makes renaming/moving directories simple.

---

## ✅ File Schema Design (No Path Field Required)

### 🔷 File Document Example:

```json
{
  "_id": ObjectId("file123"),
  "name": "Anurag.jpg",
  "size": 57956,
  "parentDirId": ObjectId("..."),
  "extension": ".jpg",
  "userId": ObjectId("...")
}
```

### 🧠 How to Get File Path

* Fetch the parent directory using `file.parentDirId`
* Use parent directory `path` + its own `name` to reconstruct the full path

---

## ✅ How to Build Directory Path

### During Directory Creation:

1. Get `parentDir.path`
2. Clone it and push the new directory’s `_id`:

```js
const newPath = [...(parentDir?.path || []), _id];
```

3. Store this in the `path` field of the new directory.

---

## ✅ Breadcrumb UI Example

```jsx
{resolvedPath.map((dir, index) => (
  <span key={dir._id}>
    <a href={`/directory/${dir._id}`}>{dir.name}</a>
    {index < resolvedPath.length - 1 && ' / '}
  </span>
))}
```