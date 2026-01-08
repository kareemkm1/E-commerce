import CategorySlider from '@/app/_component/categorySlider/page';
import { GetAllCategories } from '@/app/Api/allCategories.Api';


export default async  function Category() {
   let {data} =  await GetAllCategories();
  
  return (
    <div>
      <CategorySlider category={data}></CategorySlider>
    </div>
  )
}
