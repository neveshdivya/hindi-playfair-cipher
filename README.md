# Hindi Playfair Cipher 🇮🇳

A professional, high-performance web implementation of the **Playfair Cipher** specifically tailored for the **Hindi language (Devanagari script)**.

## 🚀 Overview
The Playfair cipher is a symmetric encryption technique that encrypts pairs of letters (digraphs) instead of single letters. Traditional Playfair uses a 5x5 grid for the English alphabet (25 letters). This project adapts the algorithm for Hindi by utilizing a **7x7 grid (49 characters)** to accommodate the rich phonetic structure of Devanagari.

## 🛠 Tech Stack
- **Frontend**: React (Vite), TypeScript, TailwindCSS, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Python (Flask), Flask-CORS.
- **Algorithm**: Customized 7x7 Playfair Matrix.

---

## 📐 The 7x7 Hindi Grid (49 Chars)
The grid incorporates:
- **11 Vowels**: अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ
- **33 Consonants**: क to ह
- **5 Specials**: अं (Anusvara), अः (Visarga), ् (Halant), क्ष (Compound), ज्ञ (Compound)

**Filler Character**: `क्ष` (used for double letters or padding).

---

## 🔧 How it Works
1.  **Key Matrix Generation**: A unique 7x7 matrix is created using the secret key followed by remaining letters of the Hindi alphabet.
2.  **Text Preparation**: The plaintext is split into pairs. If a pair has repeating characters (e.g., `कक`), the filler `क्ष` is inserted. If the total length is odd, `क्ष` is appended.
3.  **Encryption Rules**:
    -   **Same Row**: Replace with characters to the immediate right (wrap around).
    -   **Same Column**: Replace with characters immediately below (wrap around).
    -   **Rectangle**: Replace with characters in the same row but at the corners of the rectangle formed by the pair.

---

## 🧪 20 Examples to Try
| Plaintext | Key | Note |
| :--- | :--- | :--- |
| नमस्ते | भारत | Greeting |
| विज्ञान | खोज | Science |
| स्वतन्त्रता | आजादी | Freedom |
| विद्यार्थी | ज्ञान | Student |
| संगणक | यंत्र | Computer |
| हिमालय | पर्वत | Geography |
| संस्कृति | भाषा | Culture |
| लोकतंत्र | जनता | Democracy |
| अंतरिक्ष | तारा | Space |
| पर्यावरण | रक्षा | Environment |
| स्वास्थ्य | योग | Health |
| समाचार | पत्र | News |
| इतिहास | समय | History |
| मानचित्र | दिशा | Map |
| पुस्तकालय | शिक्षा | Library |
| राजधानी | दिल्ली | Capital |
| महोत्सव | उत्सव | Festival |
| कर्मभूमि | भूमि | Workplace |
| राष्ट्रवाद | देश | Nationalism |
| शुभकामा | मंगल | Best Wishes |

---

## 📂 Project Structure
```text
├── backend/
│   ├── app.py           # Flask API
│   ├── cipher.py        # Core Cryptography Logic
│   └── requirements.txt # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.tsx      # Main UI and Logic
    │   └── main.tsx     # React Entry
    ├── tailwind.config.js
    └── vite.config.ts
```

## 🏃 Running the Project
1.  **Backend** (Easiest Method):
    Double-click the `run_backend.bat` file in the main folder.

    **Manual Terminal Method**:
    ```powershell
    cd backend
    ./venv/bin/python.exe app.py
    ```
    *Note: Standard `python app.py` will fail because Flask is installed inside the virtual environment (`venv`).*

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

**Check live deployment at**: 
https://hindi-playfair-cipher.vercel.app/
