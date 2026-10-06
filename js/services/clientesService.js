const API_URL="http://localhost:8080/api/clientes";

//revisr mas tarde
const HEADERS = {"Content-Type":"application/json"}

export async function GetClientes() {
    const res = await fetch (API_URL);
    return{status:res.status,body:await res.json()};
}

export async function CreateCliente(dto) {
    const res = await fetch(API_URL,{
        method: "POST",
        headers: HEADERS,
        body:JSON.stringify(dto)
    });
    return{status:res.status, body:await res.json()};
}

export async function UpdateClientes(id, dto) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(dto)
    });
    return{status:res.status, body:await res.json()};
}

//pendiente de revision
export async function DeleteCliente(id) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: "DELETE",
    });
    return{status:res.status, body:await res.json()};
}

