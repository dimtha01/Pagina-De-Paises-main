import { useEffect } from "react";
import Hero from "../components/Hero"

const Inicio = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <section className="blur-background min-vh-100 ">
        <div className="blur-overlay">
          <Hero />
        </div>
      </section>
    </>
  )
}

export default Inicio