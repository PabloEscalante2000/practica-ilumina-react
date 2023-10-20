import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions/functions";

function Login() {
    
    const [dni,setDNI]= useState("")
    
    const validacion = async ()=>{
        
        const url = `https://nodejs-mysql-ilumina-production.up.railway.app/api/validacion/dni/${dni}`
        
        await axios({method:"GET",url:url,data:{}})
        .then(function(respuesta){
            console.log(respuesta.data[0])
            
        })
        .catch(function (error) {
            show_alerta("Error en la solicitud", "error");
            console.log(error);
          });
    }

    return (
    <div className="m-3">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Ingrese su DNI
          </label>
          <input
            type="number"
            className="form-control"
            maxLength={8}
            onChange={(e)=>{
                setDNI(e.target.value.trim())
                //console.log(dni)
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary"
        onClick={(e)=>{
            e.preventDefault()
            if(dni === ""){
                show_alerta("Tienes que ingresar tu dni","error")
            } else {
                validacion()
            }
        }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
