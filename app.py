from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# 加载市场数据
def load_market_data():
    with open('market_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    # 渲染index.html
    return render_template('index.html')

@app.route('/api/market-data')
def market_data():
    # 提供市场数据的API
    data = load_market_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
