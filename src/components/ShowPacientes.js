import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions/functions";

export const ShowPacientes = () => {
  const url =
    "https://nodejs-mysql-ilumina-production.up.railway.app/api/pacientes";
  const [pacientes, setPacientes] = useState([]);
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDNI] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [id_empresa, setIDEmpresa] = useState("");
  const [usuario, setUsuario] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async () => {
    const respuesta = await axios.get(url);
    console.log(respuesta.data[0]);
    setPacientes(respuesta.data[0]);
  };

  const openModal = (
    op,
    vid,
    vnombre,
    vapellido,
    vdni,
    vcorreo,
    vtelefono,
    vid_empresa,
    vusuario
  ) => {
    //Reseteo de valores
    setID("");
    setNombre("");
    setApellido("");
    setDNI("");
    setCorreo("");
    setTelefono("");
    setIDEmpresa("");
    setUsuario("pepito flores");
    setOperation(op);
    if (op === 1) {
      setTitle("Registrar Paciente");
    } else if (op === 2) {
      setTitle("Actualizar Paciente");
      setID(vid);
      setNombre(vnombre);
      setApellido(vapellido);
      setDNI(vdni);
      setCorreo(vcorreo);
      setTelefono(vtelefono);
      setIDEmpresa(vid_empresa);
      setUsuario(vusuario);
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    var metodos;

    if (nombre.trim() === "") {
      show_alerta("El nombre es requerido", "warning");
    } else if (apellido.trim() === "") {
      show_alerta("El apellido es requerido", "warning");
    } else if (dni.trim() === "") {
      show_alerta("El dni es requerido", "warning");
    } else if (correo.trim() === "") {
      show_alerta("El correo es requerido", "warning");
    } else if (telefono.trim() === "") {
      show_alerta("El teléfono es requerido", "warning");
    } else if (id_empresa.trim() === "") {
      show_alerta("El id_empresa es requerido", "warning");
    } else if (usuario.trim() === "") {
      show_alerta("El usuario es requerido", "warning");
    } else {
      if (operation === 1) {
        parametros = {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          dni: dni.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          id_empresa: id_empresa.trim(),
          usuario: usuario.trim(),
        };
        metodos = "POST";
      } else {
        parametros = {
          id: id.trim(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          dni: dni.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          id_empresa: id_empresa.trim(),
          usuario: usuario.trim(),
        };
        metodos = "PUT";
      }
      enviarSolicitud(metodos, parametros);
    }
  };

  const enviarSolicitud = async (metodo, parametros) => {
    await axios({ method: metodo, url: url, data: parametros })
      .then(function (respuesta) {
        console.log(respuesta);

        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_alerta(msj, tipo);
        if (respuesta.status === 204 || respuesta.status === 200) {
          document.getElementById("btnCerrar").click();
          getPacientes();
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      });
  };

  const deletePaciente = (vid, vnombre, vapellido, vusuario) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el paciente: ${vapellido}, ${vnombre}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setID(vid);
        enviarSolicitud("DELETE", { id: vid, usuario: vusuario });
      } else {
        show_alerta("El paciente NO fue eliminado", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalPacientes"
                onClick={() => {
                  openModal(1);
                }}
              >
                <i className="fa-solid fa-circle-plus"></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Id_Empresa</th>
                    <th>Primera modificación</th>
                    <th>Última modificación</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {pacientes.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>{p.apellido}</td>
                      <td>{p.dni}</td>
                      <td>{p.correo}</td>
                      <td>{p.telefono}</td>
                      <td>{p.id_empresa}</td>
                      <td>{p.usu_registro === null ? "--" : p.usu_registro}</td>
                      <td>{p.usu_ult_mod === null ? "--" : p.usu_ult_mod}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#modalPacientes"
                          onClick={() => {
                            openModal(
                              2,
                              p.id,
                              p.nombre,
                              p.apellido,
                              p.dni,
                              p.correo,
                              p.telefono,
                              p.id_empresa,
                              "Usuario1"
                            );
                          }}
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deletePaciente(
                              p.id,
                              p.nombre,
                              p.apellido,
                              "pepito"
                            );
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modalPacientes" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="dni"
                  className="form-control"
                  placeholder="DNI"
                  value={dni}
                  onChange={(e) => {
                    setDNI(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="correo"
                  className="form-control"
                  placeholder="Correo (example@gmail.com)"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="telefono"
                  className="form-control"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="id_empresa"
                  className="form-control"
                  placeholder="Empresa"
                  value={id_empresa}
                  onChange={(e) => {
                    setIDEmpresa(e.target.value);
                  }}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    validar();
                  }}
                >
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="btnCerrar"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPacientes;
