import{GetClientes, CreateCliente, UpdateClientes, DeleteCliente}from"../services/clientesService"

//elementos por id

//alerta
const alertContainer=document.getElementById("alertContainer");

//titulo form
const tituloForm=document.getElementById("tituloForm");

//form
const formCliente=document.getElementById("formCliente");

//campos cliente
const idCliente=document.getElementById("idCliente");
const txtnombreCliente=document.getElementById("txtnombreCliente");
const txtapellidoCliente=document.getElementById("txtapellidoCliente");
const numCliente=document.getElementById("numCliente");
const txtEmailCliente=document.getElementById("txtEmailCliente");
const txtdireccionCliente=document.getElementById("txtdireccionCliente");

//botones
const btnGuardar=document.getElementById("btnGuardar");
const btnCancelar=document.getElementById("btnCancelar");

//Tabla
const tablaClientes=document.getElementById("tablaClientes");

//let
let idEditando = null;
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

//validaciones clientes 
/*El campo EMAIL es obligatorio y debe tener un formato válido. Debe controlarse la 
restricción de unicidad.
○ Los campos NOMBRE, APELLIDO y TELEFONO son estrictamente obligatorios.*/

function Validar(){
    const errores = [];
    if(txtnombreCliente.value.trim().length<3)
        errores.push("El nombre debe tener al menos 3 caracteres");
    if(txtEmailCliente.value.trim().length<0)
        errores.push("El EMAIL es obligatorio");
    if(txtapellidoCliente.value.trim().length<0)
        errores.push("El apellido es obligatorio");
    if(numCliente.value.trim().length<0)
        errores.push("El numero es obligatorio");
}

//listar o llenar tabla
async function Listar() {
    const{status, body}=await GetClientes();
    if(status!==200){mostarMensaje(`[${status}]${body.message}`,
        "danger");return;}
        clientes = body.data;
        tablaClientes.innerHTML="";
        clientes.forEach(c => {
            tablaClientes.innerHTML+=`
            <tr>
                <td>${c.id}</id>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>${c.telefono}</td>
                <td>${c.email}</td>
                <td>${c.direccion}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="${c.id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="${c.id}">Borrar</button>
                </td>
            </tr>
            `
        });
}

//Crear actualizar
formCliente.addEventListener("submit",async(e)=>{
    const errores = Validar();
    if(errores=length>0){mostarMensaje(errores.join("<br>"),
    "warning");return;}
    const dto={
        nombre:txtnombreCliente.value.trim(),
        apellido:txtapellidoCliente.value.trim(),
        telefono:numCliente.value.trim(),
        email:txtEmailCliente.value.trim(),
        direccion:txtdireccionCliente.value.trim()
    };
    try {
        const resultado=idEditando===null
        ?await CreateCliente(dto)
        :await UpdateClientes(idEditando, dto);
        if(mostrarRespuesta(resultado)){limpiar(); await Listar();}
    } catch (error) {
        mostarMensaje("No se pudo conectar con la API","danger");
    }
})

//Editar
function Editar(id){
    const c = clientes.find(x=>x.id===id);
    txtnombreCliente.value=c.nombre;
    txtapellidoCliente.value=c.apellido;
    numCliente.value=c.telefono;
    txtEmailCliente.value=c.email;
    txtdireccionCliente.value=c.direccion;
    idEditando=id;
    tituloForm.textContent="Actualizar";
}

//Eliminar
async function Eliminar(id) {
    if(!confirm("¿Quiere eliminar este registro?"))return;
    try {
        const resultado = await DeleteCliente(id);
        if(mostrarRespuesta(resultado))await Listar();
    } catch (error) {
        mostarMensaje("No se pudo conectar con la API","danger");
    }
}

//Botones en tabla
tablaClientes.addEventListener("click",(e)=>{
    const btn=e.target.closest("button");
    if(!btn)return;
    const id=Number(btn.dataset.id);
    if(btn.classList.contains("btn-editar"))Editar(id);
    if(btn.classList.contains("btn-eliminar"))Eliminar(id);
});

//Limpiar
function Limpiar(){
    formCliente.reset();
    idEditando=null;
    tituloForm.textContent="Registrar Clientes"
}
btnCancelar.addEventListener("click",limpiar);

//inicio
async function Init() {
    await Listar();
}
Init();