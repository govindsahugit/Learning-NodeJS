# Signature Time Attack Explanation

## How Normal String Comparison is Vulnerable

Normal string comparison checks characters sequentially and stops at the first mismatch, creating a timing vulnerability:

- **First character wrong** → comparison completes very quickly
- **First few characters correct** → comparison takes slightly longer
- **More characters match** → comparison takes even longer

## How Attackers Exploit This

1. Send many fake signatures to your application
2. Measure the response time for each attempt
3. Use timing differences to deduce correct characters one by one
4. Gradually reconstruct the entire signature
5. Steal your secret key

This vulnerability is known as a **timing attack**.

## The Solution

Use `crypto.timingSafeEqual()` instead. It always takes the same amount of time regardless of how many characters match, preventing attackers from exploiting timing differences.