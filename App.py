############# importar librerias o recursos#####

from flask import Flask, request, jsonify, render_template
# redirect, session, flash, , send_from_directory

from flask_mysqldb import MySQL #Conectarse a mysql
from flask_cors import CORS, cross_origin
#import os
# initializations
app = Flask(__name__) #crear api y servidor 
CORS(app)
from datetime import datetime

app.static_folder = 'css'

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost'  #parametros para una base de datos desde la linea 14-19
app.config['MYSQL_USER'] = 'root' #usuario para php
app.config['MYSQL_PASSWORD'] = '' #contraseña para entrar a la base de datos
app.config['MYSQL_DB'] = 'years' #nombre de la base de datos
####---- app.config['MYSQL_PORT'] = 1234 ----####
#cunado el xampp toca cambiar el puerto toca pner EL app.config[port]

mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"


#-------------------login------#
@cross_origin()
@app.route('/compare', methods=['POST'])
def getcompare():
    try:
        v_correo = request.json['correo']
        v_password = request.json['password']
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT correo, password FROM usuario where correo =%s AND password =%s',(v_correo,v_password)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'password': result[1]} # numero de valoracion
            payload.append(content)       
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})



#-----------Añadir usuario-------------------------------
@cross_origin()
@app.route('/add_usuario', methods=['POST'])
def add_usuario():
    try:

        
        email = request.json['name']  
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT correo, password FROM usuario where correo =%s',(email,)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'password': result[1] } # numero de valoracion
            payload.append(content)
            content = {}
        if not payload: 
            email = request.json['name']  ## nombre
            password = request.json['password']        ## contraseña
            cur = mysql.connection.cursor()
            print ("h",cur)
            cur.execute("INSERT INTO usuario (correo, password) VALUES (%s,%s)", (email, password,))
            mysql.connection.commit()
            payload = []
            content = {}    
            content={"Informacion":"Registro_exitoso"}
            payload.append(content)
            return jsonify(payload)
            #return render_template('../html/Register.html')
        else:
            payload = []    
            content = {}    
            content={"Informacion":"Ya_existe"}
            payload.append(content)
            return jsonify(payload)
        
    except Exception as e:
        print(e)
        return render_template({"informacion":e})
    
"""@app.route('/corazon')
def corazon():
    import turtle

    t = turtle.Turtle()
    t.fillcolor("red")
    t.begin_fill()
    t.left(50)
    t.forward(133)
    t.circle(50, 200)
    t.right(140)
    t.circle(50, 200)
    t.forward(133)
    t.end_fill()

    turtle.done()
    return 
"""


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)