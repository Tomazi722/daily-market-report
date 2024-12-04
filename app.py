from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/market_data.json')
def market_data():
    return send_from_directory('.', 'market_data.json')

if __name__ == "__main__":
    app.run(debug=True)
