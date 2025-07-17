## What are SSH Keys?

SSH (Secure Shell) is a protocol for securely accessing remote computers. Instead of relying solely on passwords, SSH uses a pair of cryptographic keys for authentication, making logins both stronger and more convenient.

### SSH Key Pair

- **Public Key:** Placed on the server; acts like a lock for your login.
- **Private Key:** Stored securely on your computer; acts as the key to unlock access.

### How SSH Login Works

1. **Generate a key pair:**  
    Use `ssh-keygen` to create your public and private keys.
2. **Copy the public key to the server:**  
    Use `ssh-copy-id` to add your public key to the server’s authorized keys.
3. **Connect to the server:**  
    When you attempt to log in, the server uses your public key to send a challenge that only your private key can solve.
4. **Authentication:**  
    If your private key successfully solves the challenge, you are granted access.

