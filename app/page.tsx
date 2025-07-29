import OrcForm from "./components/OrcForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-amber-500 pb-1"
        >Gerador de Orçamento</h1>
        <OrcForm></OrcForm>
    </div>
  );
}
