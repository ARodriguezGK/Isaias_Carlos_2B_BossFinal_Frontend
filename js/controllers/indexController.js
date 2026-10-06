import { GetClientes } from "../services/clientesService";
import { GetEventos, CreateEvento,UpdateEvento,DeleteEvento} from "../services/eventosService";
import { GetSalones } from "../services/salonesService";

//elementos por id

//alerta
const alertContainer=document.getElementById("alertContainer");

//titulo form
const tituloForm=document.getElementById("tituloForm");

//form
const formCliente=document.getElementById("formEvento");

//campos cliente
const idEvento=document.getElementById("idEvento");
const txtnombreEvento=document.getElementById("txtnombreEvento");
const datefechaEvento=document.getElementById("datefechaEvento");
const txtCliente=document.getElementById("txtCliente");
const txtSalon=document.getElementById("txtSalon");
const numcantidadPersonas=document.getElementById("numcantidadPersonas");
const numcantidadHoras=document.getElementById("numcantidadHoras");
const txtEstado=document.getElementById("txtEstado");
const numPagoTotal=document.getElementById("numPagoTotal");


//botones
const btnGuardar=document.getElementById("btnGuardar");
const btnCancelar=document.getElementById("btnCancelar");

//Tabla
const tablaClientes=document.getElementById("tablaEventos");

//let
let idEditando = null;
let eventos = [];

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


//cargar select clientes
async function cargarClientes() {
    const{status, body}=await GetClientes;
    if(status!=200){,mostarMensaje(`[${status}]${body.message}`,"danger");return;}
    clientes=body.data;
    txtCliente.innerHTML="";
    txtCliente.add(new Option("Seleccione un cliente",""));
    clientes.forEach(c=>txtCliente.add(new Option(c.nombre,c.id)));
}

//cargar select salon 
async function cargarSalon() {
    const{status, body}=await GetSalones;
    if(status!=200){,mostarMensaje(`[${status}]${body.message}`,"danger");return;}
    salones=body.data;
    txtSalon.innerHTML="";
    txtSalon.add(new Option("Seleccione un salon", ""));
    salones.forEach(s=>txtSalon.add(new Option(s.nombre,c.id)));
}

/*listar o llenar tabla
async function Listar() {
    const{status, body}=await GetEventos();
    if(status!==200){mostarMensaje(`[${status}]${body.message}`,
        "danger");return;}
        eventos=body.data;
        tablaEventos.innerHTML="";
        eventos.forEach(e => {
            const s=salon.find()
            tablaEventos.innerHTML+=`
            <tr>
        <td>${e.id}</id>
        <td>${e.nombre}</td>
        <td>${e.fecha_evento}</td>
        <td>${e.cantidad_personas}</td>
        <td>${e.cantidad_horas}</td>
        <td>${e.estado}</td>
        <td>${e.total_pago}</td>
        <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${e.id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${e.id}">Borrar</button>
        </td>
    </tr>
            `
        });
}*/