import images from "@/assets";

const Home = () => {
  return (
    <div className="relative w-screen h-screen">
        <img src={images.slider1} alt="img" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default Home;
