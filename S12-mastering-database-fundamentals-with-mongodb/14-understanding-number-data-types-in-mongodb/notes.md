# MongoDB Number Data Types

MongoDB supports multiple numeric types to handle different use cases.

---

## 1. Int32 (Standard Number)
- **Purpose**: Used for regular integers.  
- **Range**: `-2,147,483,648` to `2,147,483,647`.  
- **Use Case**: Suitable for most everyday applications where values fit within 32-bit integers.  

---

## 2. Int64 – `NumberLong()`
- **Purpose**: Stores very large integers beyond the Int32 range.  
- **Reason**: Required when numbers exceed JavaScript's **safe integer limit** (`±9,007,199,254,740,991`).  
- **Use Case**: Storing large IDs, counters, or values in billions/trillions.  

---

## 3. Decimal128 – `NumberDecimal()`
- **Purpose**: High-precision decimal values.  
- **Size**: 128-bit floating-point format.  
- **Use Case**: Ideal for **financial, monetary, or scientific calculations** where rounding errors must be avoided.  
