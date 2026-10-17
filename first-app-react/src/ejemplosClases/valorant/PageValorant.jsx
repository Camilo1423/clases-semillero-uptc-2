import { useEffect, useState } from "react";
import { CardAgent } from "./CardAgent";
import axios from "axios";

function PageValorant() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const response = await axios.get("https://valorant-api.com/v1/agents");
    const charactersApp = response.data.data.map((character) => {
      return {
        id: character.uuid,
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
      <header className="border-b border-line px-4 pt-12 pb-8 sm:px-6 sm:pt-18 sm:pb-10">
        <div className="mx-auto max-w-[1200px]">
          <span className="mb-4 inline-block border-l-3 border-accent bg-accent/8 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            Valorant API · Agents
          </span>
          <h1 className="font-display text-[clamp(44px,8vw,88px)] leading-[0.95] font-normal tracking-[0.01em] uppercase">
            Conoce a los <span className="text-accent">agentes</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-base leading-[1.6] text-text-muted">
            Listado de agentes obtenido en tiempo real desde
            <a href="https://valorant-api.com" target="_blank" rel="noopener">
              valorant-api.com
            </a>
            .
          </p>
        </div>
      </header>
      {characters.length === 0 && (
        <div className="flex min-h-80 flex-col items-center justify-center gap-4">
          <div className="size-10 animate-spin rounded-full border-3 border-line border-t-accent [animation-duration:0.8s]" />
          <p className="text-sm tracking-[0.08em] text-text-muted uppercase">
            Cargando agentes…
          </p>
        </div>
      )}
      <section
        id="impresora"
        className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-6"
      >
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
