from flask import Flask, request, jsonify
from flask_cors import CORS
from cipher import HindiPlayfair

app = Flask(__name__)
CORS(app)
cipher_tool = HindiPlayfair()

@app.route('/api/matrix', methods=['POST'])
def get_matrix():
    data = request.json
    key = data.get('key', '')
    matrix = cipher_tool.generate_matrix(key)
    return jsonify({'matrix': matrix})

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    text = data.get('text', '')
    key = data.get('key', '')
    result = cipher_tool.encrypt(text, key)
    return jsonify({'result': result})

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    text = data.get('text', '')
    key = data.get('key', '')
    result = cipher_tool.decrypt(text, key)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
