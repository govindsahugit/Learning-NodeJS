# OSI Model

The **OSI Model** (Open Systems Interconnection Model) is a conceptual framework that standardizes the functions of a communication system into seven distinct layers. Each layer serves a specific purpose in the process of transferring data across a network.

## The 7 Layers of the OSI Model (Top to Bottom)

### 7. Application Layer
- **Role:** Interfaces directly with end users and provides network services to applications.
- **Functions:**
    - File transfers
    - Email
    - Web browsing
    - Network management
- **Examples:** HTTP, HTTPS, FTP, SMTP, DNS, Telnet

### 6. Presentation Layer
- **Role:** Translates, encrypts, and compresses data for the Application Layer.
- **Functions:**
    - Data formatting (text, image, video)
    - Encryption/Decryption (SSL/TLS)
    - Data compression
- **Examples:** SSL/TLS, JPEG, MP4, GIF, ASCII, EBCDIC

### 5. Session Layer
- **Role:** Manages sessions (connections) between computers.
- **Functions:**
    - Establishes, maintains, and terminates sessions
    - Synchronization and session checkpoints
- **Examples:** NetBIOS, RPC, PPTP

### 4. Transport Layer
- **Role:** Ensures reliable or unreliable delivery of data with error checking and flow control.
- **Functions:**
    - Segmentation and reassembly of data
    - Error detection and correction
    - Flow control and retransmission
- **Examples:** TCP (reliable), UDP (unreliable)

### 3. Network Layer
- **Role:** Routes data between devices using logical addressing.
- **Functions:**
    - Logical addressing (IP)
    - Routing and path selection
    - Packet forwarding
- **Examples:** IP (IPv4/IPv6), ICMP, Routers

### 2. Data Link Layer
- **Role:** Transfers data between devices on the same network and handles error detection/correction.
- **Functions:**
    - Framing data for transmission
    - MAC addressing
    - Error detection (CRC)
- **Examples:** Ethernet, MAC address, Switches, Bridges, PPP, ARP

### 1. Physical Layer
- **Role:** Transmits raw bits over the physical medium.
- **Functions:**
    - Defines voltage levels, data rates
    - Specifies physical connectors and cabling
    - Handles bit-by-bit delivery
- **Examples:** Ethernet cables, fiber optics, Hubs, Repeaters, Wi-Fi, Bluetooth, Modems

