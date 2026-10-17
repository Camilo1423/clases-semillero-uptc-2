const CardAgent = ({ img, nameCharacter, description }) => {
  return (
    <div className="container-character">
      <div className="container-image">
        <img src={img} alt="personaje-${nameCharacter}-valorant" />
      </div>
      <div className="container-info">
        <h2>{nameCharacter}</h2>
        <p>{description}</p>
        <button>Like this agent</button>
      </div>
    </div>
  );
};

export { CardAgent };