export async function GetBrandDetails(id:string){
   let response =await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
   let data  = await response.json();

   return data
}