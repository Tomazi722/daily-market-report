from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

# 读取market_data.json文件
def load_market_data():
    with open('market_data.json', 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/market-data')
def market_data():
    data = load_market_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
