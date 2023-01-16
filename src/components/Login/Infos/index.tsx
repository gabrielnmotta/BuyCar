import Lottie from "lottie-react-web";
import Buy from "../../gifs/buy.json";

const Infos = () => {
  return (
    <div className="flex flex-col items-start justify-center text-neutral-0 h-full  ml-32 text-body ">
      <h1 className="z-20 font-semibold mb-3 mt-40">Financie seu veículo próprio</h1>
      <p>
        Faça o financiamento do seu veículo <br /> próprio e tenha seu próprio veículo
      </p>

      <div className="z-10 mb-10 ml-25">
      <Lottie
        options={{ animationData: Buy }}
        style={{ width: "150%" }}
        />

        {/* <img
          src="/Login/mainScreen.svg"
          alt="Main screen"
          className="h-[60vh]"
        /> */}
      </div>
    </div>
  );
};

export default Infos;
