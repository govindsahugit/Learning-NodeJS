# Transferring Files Using UDP (Not Recommended)

UDP is fast but unreliable:
- No guarantee of delivery
- No guaranteed packet order
- No error checking

## Why UDP File Transfer is Not Recommended
1. Limited packet size (~65KB maximum)
2. No built-in retransmission mechanism
3. No automatic acknowledgment system

## Better Alternatives
- **For UDP**: Split files into chunks and implement custom streaming with:
    - Manual packet ordering
    - Loss detection and handling

- **Recommended Approach**: Use TCP instead
    - Built-in reliability mechanisms
    - Automatic packet management
    
> **Note**: UDP file transfer is only used in specific cases like TFTP or real-time applications where speed is critical over reliability.