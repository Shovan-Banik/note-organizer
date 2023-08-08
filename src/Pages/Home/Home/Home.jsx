import Lottie from "lottie-react";
import animation from '../../../assets/animations/animation_ll0vsfet (1).json';
import image1 from '../../../assets/img/happy.png'
import image2 from '../../../assets/img/tensed2.png'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Note Organizer | Home</title>
            </Helmet>
            <div className="md:w-1/3 mx-auto">
                <h2 className="text-5xl font-bold text-white py-12">Note Organizer</h2>
                <Lottie animationData={animation} loop={true} />;
            </div>
            <div className="md:flex md:justify-between ">
                <div className="md:w-1/2 flex justify-center items-center">
                    <div className="text-center md:text-start">
                        <h2 className="text-5xl font-bold text-white">Note Your schedule And Relax your Brain!</h2>
                        <p className="text-md py-4 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit consequatur, laboriosam laudantium quaerat nam pariatur maiores quae eaque beatae omnis.</p>
                        <Link to='/signUp'><button className="btn bg-lime-700">SingUp</button></Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img className="h-[500px]" src={image1} alt="" />
                </div>
            </div>
            <div className="md:flex py-5">
                <div className="md:w-1/2 mx-auto">

                    <img className="h-[500px]" src={image2} alt="" />
                </div>
                <div className="md:w-1/2 mx-auto flex justify-center items-center">
                    <div className="text-center w-full md:text-start">
                        <h2 className="text-5xl font-bold text-white">Make your Note Secure and well organized</h2>
                        <p className="text-md py-4 text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore aliquid natus praesentium beatae adipisci officia! Assumenda, aspernatur. Quasi, assumenda nam.</p>
                        <Link to='/'><button className="btn bg-lime-700">Get Started</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;