export default function Home() {
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Home</h2>
      <p>
        Utilisez l'onglet "Données Horaires" de{" "}
        <a href="https://re.jrc.ec.europa.eu/pvg_tools/fr/tools.html">PVGIS</a>{" "}
        pour télécharger le fichier CSV{" "}
      </p>
      <p>
        Allez sur le site d'
        <a href="https://mon-compte-particulier.enedis.fr/suivi-de-mesures/">
          Enedis
        </a>{" "}
        pour télécharger vos données
      </p>
      <p>Allez sur l'onglet estimate pour voir les graphique</p>
    </main>
  );
}
