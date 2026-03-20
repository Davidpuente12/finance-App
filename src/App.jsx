import { SectionMain } from "./Section_main/section_main";
import { SectionBalance } from "./Section_balance/section_balance";

function App() {
  return (
    <>
      <header>
        <p>Wallet</p>
      </header>
      <div className="content-sections">
        <SectionBalance />
        <SectionMain />
      </div>
    </>
  );
}

export default App;
