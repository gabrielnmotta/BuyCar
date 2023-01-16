import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import Lottie from "lottie-react-web";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Ok from "../../gifs/Ok";
import { db } from "../../services/firebaseConfig";
import { cpfMask, phoneMask } from "../../utils/masks";
import Button from "../FormsComponents/Button";
import Input from "../FormsComponents/Input";
import UploadImage from "../FormsComponents/UploadImage";
import BaseCardC from "../Lib/BaseCardC";
import PageTitleSubtitle from "../PageTitleSubtitle";

const FormBuy = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [carteira, setCarteira] = useState("");
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleImage = (e: File | null) => {
    if (e) {
      var reader = new FileReader();
      reader.readAsDataURL(e);
      reader.onload = function () {
        const res = reader.result?.toString().split("base64,")[1];
      };
      reader.onerror = function (error) {
        toast.warn("Erro ao carregar imagem");
      };
    }
  };

  const handleImage2 = (e: File | null) => {
    if (e) {
      var reader2 = new FileReader();
      reader2.readAsDataURL(e);
      reader2.onload = function () {
        const res = reader2.result?.toString().split("base64,")[2];
      };
      reader2.onerror = function (error) {
        toast.warn("Erro ao carregar imagem");
      };
    }
  };

  const load = () => {
    if (
      cpf.length > 0 &&
      carteira.length > 0 &&
      name.length > 0 &&
      company.length > 0
    ) {
      setApproved(true);
    } else toast.warn("Preencha todos os campos");
  };

  const save = async () => {
    if (
      cpf.length > 0 &&
      carteira.length > 0 &&
      name.length > 0 &&
      company.length > 0
    ) {
      await addDoc(collection(db, "visitors"), {
        company: company,
        cpf: cpf,
        email: email,
        name: name,
        fone: phone,
        approved: null,
      });
      setLoading(true);
    } else toast.warn("Preencha todos os campos");
  };
  return (
    <>
      <div className="flex flex-1 max-[20rem]">
        <BaseCardC>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-5   "
          >
            <div className="mb-8">
              <p className="text-title3 mb-4">
                Preencha os dados para solicitar financiamento
              </p>
            </div>

            <form className="flex flex-col gap-5 ">
              <Input
                label="Nome:"
                placeholder="Insira seu nome"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <Input
                value={cpfMask(cpf)}
                required
                label="CPF:"
                placeholder="Insira seu CPF"
                onChange={(e) => setCpf(e.target.value)}
              />

              <Input
                value={carteira}
                required
                label="Carteira de Identidade:"
                placeholder="Insira sua Carteira de Identidade"
                onChange={(e) => setCarteira(e.target.value)}
              />
              <Input
                value={company}
                required
                label="Revendedora:"
                placeholder="Insira sua Revendedora"
                onChange={(e) => setCompany(e.target.value)}
              />
              <div className="flex gap-32">
                <UploadImage
                  handleImage={handleImage}
                  label="Comprovante de Residência"
                  containerStyle="flex items-center justify-center w-full border-[1px] border-neutral-200 rounded-2xl h-full row-start-1 "
                  divStyle="row-span-2"
                  imgSize={{ height: "6rem", width: "6rem" }}
                  name="photo64"
                />

                <UploadImage
                  handleImage={handleImage2}
                  subtitle="Comprovante de Rendimentos"
                  containerStyle="flex items-center justify-center w-full border-[1px] border-neutral-200 rounded-2xl h-full row-start-1 "
                  divStyle="row-span-2"
                  imgSize={{ height: "6rem", width: "6rem" }}
                  name="photo64"
                />
              </div>
            </form>
            {!approved ? (
              <Button
                title="Validar"
                containerStyle="justify-center  mt-8 h-12"
                onClick={load}
                size="large"
              />
            ) : (
              <Ok inlineStyle={{ width: "10%" }} />
            )}
          </motion.div>
        </BaseCardC>
      </div>
      {approved ? (
        <div className="flex flex-1 max-[20rem]">
          <BaseCardC>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-5   "
            >
              <div className="mb-8">
                <p className="text-title3 mb-4">
                  Preencha os dados para solicitar financiamento
                </p>
              </div>

              <form className="flex flex-col gap-5 ">
                <Input
                  label="Nome:"
                  placeholder="Insira seu nome"
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <Input
                  value={cpfMask(cpf)}
                  required
                  label="CPF:"
                  placeholder="Insira seu CPF"
                  onChange={(e) => setCpf(e.target.value)}
                />

                <Input
                  value={carteira}
                  required
                  label="Carteira de Identidade:"
                  placeholder="Insira sua Carteira de Identidade"
                  onChange={(e) => setCarteira(e.target.value)}
                />
                <Input
                  value={company}
                  required
                  label="Revendedora:"
                  placeholder="Insira sua Revendedora"
                  onChange={(e) => setCompany(e.target.value)}
                />
                <div className="flex gap-32">
                  <UploadImage
                    handleImage={handleImage}
                    label="Comprovante de Residência"
                    containerStyle="flex items-center justify-center w-full border-[1px] border-neutral-200 rounded-2xl h-full row-start-1 "
                    divStyle="row-span-2"
                    imgSize={{ height: "6rem", width: "6rem" }}
                    name="photo64"
                  />

                  <UploadImage
                    handleImage={handleImage2}
                    subtitle="Comprovante de Rendimentos"
                    containerStyle="flex items-center justify-center w-full border-[1px] border-neutral-200 rounded-2xl h-full row-start-1 "
                    divStyle="row-span-2"
                    imgSize={{ height: "6rem", width: "6rem" }}
                    name="photo64"
                  />
                </div>
              </form>
              {!approved ? (
                <Button
                  title="Validar"
                  containerStyle="justify-center  mt-8 h-12"
                  onClick={load}
                  size="large"
                />
              ) : (
                <Ok inlineStyle={{ width: "10%" }} />
              )}
            </motion.div>
          </BaseCardC>
        </div>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default FormBuy;
