import Button from "../../../components/FormsComponents/Button";
import Input from "../../../components/FormsComponents/Input";
import usePartnersAccessContext from "../../../context/PartnersAccessContext";
import { UserI } from "../../../context/PartnersAccessContext/type";
import { DocumentDownload, People, SearchNormal1 } from "iconsax-react";
import * as XLSX from "xlsx";
import CardWTitle from "../../Lib/Card/CardWTitle";
import InfoRow from "../../Lib/InfoRow";

interface SearchRowI {
  search: (e: string) => void;
}

const SearchRow = ({ search }: SearchRowI) => {
  const {
    setUserType,
    userType,
    allList,
    approvedList,
    repprovedList,
    notAwnseredList,
  } = usePartnersAccessContext();

  const downloadExcel = (data: UserI[]) => {
    const list: any = [];
    data.map((i) => {
      list.push({
        nome: i.name,
        cpf: i.cpf,
        celular: i.fone,
        email: i.email,
        Empresa: i.company,
        aprovado: i.approved,
      });
    });
    var Heading = [["Nome", "CPF", "Celular", "Email", "Empresa", "Aprovado"]];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workbook, Heading);
    const worksheet = XLSX.utils.sheet_add_json(workbook, list, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de pessoas");
    XLSX.writeFile(workbook, "Lista de Pessoas.xlsx");
  };

  return (
    <div className="flex items-center justify-center border-b-[1px] border-neutral-100 pb-6 ">
      <div className="">
        <div>
          <CardWTitle
            title="Status do Cadastro"
            Icon={People}
            containerStyle="w-[45rem] h-[10rem] ml-10"
          >
            <InfoRow
              data={[
                {
                  title: "Cadastros Sem Resposta",
                  info: `${notAwnseredList.length}`,
                },
                {
                  title: "Cadastros Aprovados",
                  info: `${approvedList.length}`,
                },
                {
                  title: "Cadastros Reprovados",
                  info: `${repprovedList.length}`,
                },
                {
                  title: "Total Cadastros",
                  info: `${allList.length}`,
                },
              ]}
            />
          </CardWTitle>
        </div>

        <div className="flex pt-2">
          <Input
            placeholder="Buscar por nome ou CPF"
            onChange={(e) => search(e.target.value)}
            containerStyle="w-[16rem]"
          >
            <SearchNormal1 className="text-primary-900 " />
          </Input>

          <Button
            title="Todos"
            onClick={() => setUserType("all")}
            empty={userType !== "all"}
            containerStyle="w-[7rem] ml-6 mr-4 flex-wrap"
          />

          <Button
            title="Espera"
            onClick={() => setUserType("not_awnsered")}
            empty={userType !== "not_awnsered"}
            containerStyle="w-[7rem] mr-4 flex-wrap"
          />

          <Button
            title="Aprovados"
            onClick={() => setUserType("approved")}
            empty={userType !== "approved"}
            containerStyle="w-[7rem] mr-4 flex-wrap"
          />
          <Button
            title="Reprovados"
            onClick={() => setUserType("reproved")}
            empty={userType !== "reproved"}
            containerStyle="w-[7rem] flex-wrap"
          />

          <div className="flex items-center ml-4">
            <Button title="" onClick={() => downloadExcel(allList)}>
              <DocumentDownload />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRow;
