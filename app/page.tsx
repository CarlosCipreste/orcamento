import OrcForm from "./components/OrcForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-amber-500 pb-1 md:text-[3rem] text-[2rem]"
        >Gerador de Orçamento</h1>
        <OrcForm></OrcForm>
    </div>
  );
}
