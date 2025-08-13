## OSI Model (Open Systems Interconnection Model)

The OSI Model explains how data moves across a network by dividing the process into seven distinct layers. Each layer has a specific function, and together they enable communication between devices.

### The 7 Layers of the OSI Model (Top to Bottom)

1. **Application Layer**

   - Interfaces directly with users and software applications.
   - Manages tasks like file transfers, email, web browsing, and network management.
   - **Examples:** HTTP, FTP, SMTP, DNS

2. **Presentation Layer**

   - Formats, encrypts, or compresses data for the Application Layer.
   - **Examples:** SSL/TLS (encryption), JPEG (image format), MP4 (video format)

3. **Session Layer**

   - Establishes, manages, and terminates sessions between devices.
   - **Examples:** NetBIOS, RPC

4. **Transport Layer**

   - Provides reliable or fast data transfer, depending on the protocol.
   - Handles error checking, flow control, and segmentation of data.
   - **Examples:** TCP (reliable), UDP (unreliable)

5. **Network Layer**

   - Routes data between devices across different networks using logical addresses.
   - Determines the best path for data transmission.
   - **Examples:** IP, routers

6. **Data Link Layer**

   - Transfers data within the same local network and checks for errors.
   - Uses physical addresses (MAC addresses) and frames data.
   - **Examples:** Ethernet, switches

7. **Physical Layer**
   - Transmits raw bits over physical media like cables or wireless signals.
   - Defines electrical signals, connectors, and hardware.
   - **Examples:** Ethernet cables, Wi-Fi, Bluetooth

---

The OSI Model's layered approach allows diverse communication technologies to interoperate by assigning clear responsibilities to each layer.
