import { GetSalones } from "../services/salonesService"

//elementos por id

//alerta
const alertContainer=document.getElementById("alertContainer");

//Tabla
const tablaClientes=document.getElementById("tablaSalon");

//let
let clientes = [];

//funcion mensaje
function mostarMensaje(texto,Tipo="success"){
    alertContainer.innerHTML=`
    <div class="alert alert-${tipo} alert-dismissible fade show">
        ${texto}
        <button type="button" class="btn-close" data-bs-dismiss="alert">
        </button>
    </div>
    `
}

//codigo de estado Api response
function mostrarRespuesta({status, body}){
    const ok = status>=200&&status<300;
    mostarMensaje(`<strong>[${status}]</strong> ${body.message}`,
        ok?"success":"danger");
    return ok;
}

//listar o llenar tabla
async function Listar() {
    const{status, body}=await GetSalones();
    if(status!==200){mostarMensaje(`[${status}]${body.message}`,
        "danger");return;}
        salones = body.data;
        tablaSalon.innerHTML="";
        salones.forEach(s => {
            tablaSalon.innerHTML+=`
            <tr>
                <td>${s.id}</id>
                <td>${s.nambre}</td>
                <td>${s.capacidad}</td>
                <td>${s.precio}</td>
                <td>${s.ubicacion}</td>
                
            </tr>
            `
        });
}

//inicio
async function Init() {
    await Listar();
}
Init();

