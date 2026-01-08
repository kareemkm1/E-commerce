   export async function GetAllCategories(){
   let response =await fetch('https://ecommerce.routemisr.com/api/v1/categories');
   let data  =response.json();


   return data
}