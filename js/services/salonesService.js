const API_URL = "";
//endpoint pendiente

export async function GetSalones() {
    const res = await fetch(API_URL);
    return{status:res.status,body:await res.json()};
}