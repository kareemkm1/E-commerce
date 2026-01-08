import Category from "./(component)/categories/page";
import Products from "./(component)/product/page";
import MainSlider from "./_component/navbar/mainSlider/page";

export default function Home() {
  return (
    <>
     <MainSlider/>
     <div className="w-[90%] mx-auto">
     <Category/>
     <Products/>
     </div>
    </>
  );
}
