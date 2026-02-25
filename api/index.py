import sys
import os

# Add the backend directory to the sys.path so we can import app and cipher
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app import app

# Vercel's Python runtime searches for 'app' or 'application'
# so this index.py becomes the function handler.
