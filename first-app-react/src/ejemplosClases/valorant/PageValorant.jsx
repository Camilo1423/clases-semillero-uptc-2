import { useEffect, useState } from "react";
import { CardAgent } from "./CardAgent";
import axios from "axios";

function PageValorant() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const response = await axios.get("https://valorant-api.com/v1/agents");
    const charactersApp = response.data.data.map((character) => {
      return {
        nombrePersonaje: character.displayName,
        descripcionPersonaje:
          character.description ??
          `El personaje ${character.displayName} no tiene descripción`,
        imagenPersonaje: character.displayIcon,
      };
    });
    setCharacters(charactersApp);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-tag">Valorant API · Agents</span>
          <h1 className="hero-title">
            Conoce a los <span>agentes</span>
          </h1>
          <p className="hero-subtitle">
            Listado de agentes obtenido en tiempo real desde
            <a href="https://valorant-api.com" target="_blank" rel="noopener">
              valorant-api.com
            </a>
            .
          </p>
        </div>
      </header>
      <section id="impresora">
        {characters.map((character) => (
          <CardAgent
            key={character.id}
            img={character.imagenPersonaje}
            nameCharacter={character.nombrePersonaje}
            description={character.descripcionPersonaje}
          />
        ))}
      </section>
    </>
  );
}

export { PageValorant };
