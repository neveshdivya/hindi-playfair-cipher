from cipher import HindiPlayfair

def test_cipher():
    cipher = HindiPlayfair()
    key = "नमस्ते"
    plain_text = "अंक्ष"
    
    print(f"Original Text: {plain_text}")
    print(f"Key: {key}")
    
    prepared = cipher.prepare_text(plain_text)
    print(f"Prepared Text: {prepared}")
    
    encrypted = cipher.encrypt(plain_text, key)
    print(f"Encrypted: {encrypted}")
    
    parsed_encrypted = cipher.parse_symbols(encrypted)
    print(f"Parsed Encrypted Symbols: {parsed_encrypted}")
    
    decrypted = cipher.decrypt(encrypted, key)
    print(f"Decrypted: {decrypted}")
    
    if plain_text in decrypted:
        print("SUCCESS: Decryption worked!")
    else:
        print("FAILURE: Decryption failed!")

if __name__ == "__main__":
    test_cipher()
