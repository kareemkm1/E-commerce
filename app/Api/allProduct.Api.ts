export async function GetAllProducts(){
   let response =await fetch('https://ecommerce.routemisr.com/api/v1/products');
   let data  =response.json();


   return data
}