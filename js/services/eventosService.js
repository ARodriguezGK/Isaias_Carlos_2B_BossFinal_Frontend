const API_URL="";
//endpoint pendiente

//revisr mas tarde
const HEADERS = {"Content-Type":"application/json"}

export async function GetEventos() {
    const res = await fetch (API_URL);
    return{status:res.status,body:await res.json()};
}

export async function CreateEvento(dto) {
    const res = await fetch(API_URL,{
        method: "POST",
        headers: HEADERS,
        body:JSON.stringify(dto)
    });
    return{status:res.status, body:await res.json()};
}

export async function UpdateEvento(id, dto) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(dto)
    });
    return{status:res.status, body:await res.json()};
}

//pendiente de revision
export async function DeleteEvento(id) {
    const res = await fetch(`${API_URL}/${id}`,{
        method: "DELETE",
    });
    return{status:res.status, body:await res.json()};
}

