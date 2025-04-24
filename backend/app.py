from flask import Flask, request, jsonify
from flask_cors import CORS
from .db import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route("/todos", methods=["GET"])
def get_todos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM todos")
    todos = cursor.fetchall()
    conn.close()
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.get_json()
    task = data.get("task")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (task, completed) VALUES (%s, %s)", (task, False))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo added"}), 201

@app.route("/todos/<int:id>", methods=["PUT"])
def toggle_todo(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE todos SET completed = NOT completed WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo toggled"})

@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Todo deleted"})

if __name__ == "__main__":
    app.run(debug=True)
