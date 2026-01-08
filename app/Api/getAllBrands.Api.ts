export async function GetAllBrands(){
   let response =await fetch('https://ecommerce.routemisr.com/api/v1/brands');
   let data  =response.json();


   return data
}