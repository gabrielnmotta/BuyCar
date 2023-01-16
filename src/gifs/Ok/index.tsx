import Lottie, { LottieProps } from "lottie-react-web";
import { CSSProperties } from "react";
import gif from "./ok.json";

interface OkI {
  inlineStyle?: CSSProperties;
}

const Ok = ({ inlineStyle }: OkI) => {
  return (
    <div style={inlineStyle}>
      <Lottie options={{ animationData: gif, loop: false }} />
    </div>
  );
};

export default Ok;
