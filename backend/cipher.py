import re

class HindiPlayfair:
    def __init__(self):
        # 49 characters for a 7x7 grid
        self.ALPHABET = [
            'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ',
            'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
            'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
            'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श',
            'ष', 'स', 'ह', 'अं', 'अः', '्', 'क्ष', 'ज्ञ'
        ]
        self.FILLER = 'क्ष'

    def generate_matrix(self, key):
        key = key.replace(" ", "")
        # Filter key to only include alphabet chars and maintain unique order
        unique_chars = []
        for char in key:
            if char in self.ALPHABET and char not in unique_chars:
                unique_chars.append(char)
        
        # Fill rest of matrix with alphabet
        for char in self.ALPHABET:
            if char not in unique_chars:
                unique_chars.append(char)
        
        # Reshape to 7x7
        matrix = [unique_chars[i:i + 7] for i in range(0, 49, 7)]
        return matrix

    def find_position(self, matrix, char):
        for r, row in enumerate(matrix):
            if char in row:
                return r, row.index(char)
        return None

    def prepare_text(self, text):
        # Use parse_symbols to get symbols from alphabet correctly
        symbols = self.parse_symbols(text)
        
        res = []
        i = 0
        while i < len(symbols):
            c1 = symbols[i]
            if i + 1 < len(symbols):
                c2 = symbols[i+1]
                if c1 == c2:
                    res.append(c1)
                    res.append(self.FILLER)
                    i += 1
                else:
                    res.append(c1)
                    res.append(c2)
                    i += 2
            else:
                res.append(c1)
                res.append(self.FILLER)
                i += 1
        return res

    def parse_symbols(self, text):
        # Sort alphabet by length descending to match longest symbols first
        sorted_alphabet = sorted(self.ALPHABET, key=len, reverse=True)
        symbols = []
        i = 0
        while i < len(text):
            match_found = False
            for sym in sorted_alphabet:
                if text.startswith(sym, i):
                    symbols.append(sym)
                    i += len(sym)
                    match_found = True
                    break
            if not match_found:
                # Skip unknown character
                i += 1
        return symbols

    def encrypt(self, plain_text, key):
        matrix = self.generate_matrix(key)
        prepared = self.prepare_text(plain_text)
        cipher_text = ""
        
        for i in range(0, len(prepared), 2):
            char1, char2 = prepared[i], prepared[i+1]
            row1, col1 = self.find_position(matrix, char1)
            row2, col2 = self.find_position(matrix, char2)
            
            if row1 == row2:
                cipher_text += matrix[row1][(col1 + 1) % 7]
                cipher_text += matrix[row2][(col2 + 1) % 7]
            elif col1 == col2:
                cipher_text += matrix[(row1 + 1) % 7][col1]
                cipher_text += matrix[(row2 + 1) % 7][col2]
            else:
                cipher_text += matrix[row1][col2]
                cipher_text += matrix[row2][col1]
        
        return cipher_text

    def decrypt(self, cipher_text, key):
        matrix = self.generate_matrix(key)
        # Parse cipher_text into symbols from the alphabet
        symbols = self.parse_symbols(cipher_text)
        decrypted_text = ""
        
        for i in range(0, len(symbols), 2):
            char1, char2 = symbols[i], symbols[i+1]
            row1, col1 = self.find_position(matrix, char1)
            row2, col2 = self.find_position(matrix, char2)
            
            if row1 == row2:
                decrypted_text += matrix[row1][(col1 - 1) % 7]
                decrypted_text += matrix[row2][(col2 - 1) % 7]
            elif col1 == col2:
                decrypted_text += matrix[(row1 - 1) % 7][col1]
                decrypted_text += matrix[(row2 - 1) % 7][col2]
            else:
                decrypted_text += matrix[row1][col2]
                decrypted_text += matrix[row2][col1]
        
        return decrypted_text
