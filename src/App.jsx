import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./page/Inicio"
import Error404 from "./page/Error404"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Paises from "./page/Paises"
import Continentes from "./page/Region"
import { SubContinentes } from "./page/SubContinentes"
import Buscar from "./page/Buscar"
import Detalles from "./page/Detalles"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/paises" element={<Paises />} />
          <Route path="/continentes/:id" element={<Continentes />} />
          <Route path="/subContinentes/:id" element={<SubContinentes />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/detalles/:id" element={<Detalles />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App