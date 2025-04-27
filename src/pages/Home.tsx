import FullScreenSlider from '../components/FullScreenSlider';
import img from '@/assets/img3.jpg';

const Home = () => {
  return (
    <div className="relative h-screen w-screen">
        <img src={img} alt="img" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default Home;
