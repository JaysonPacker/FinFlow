const helper = require("./helper");
const React = require("react");
const { createRoot } = require("react-dom/client");
const { useState, useEffect } = React;

const DomoList = (props) => {
  const [domos, setDomos] = useState(props.domos);

  useEffect(() => {
    const loadDomosFromServer = async () => {
      const response = await fetch("/getPublicDomos");
      const data = await response.json();
      setDomos(data.domos);
    };
    loadDomosFromServer();
  }, [props.reloadDomos]);

  if (domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Public Domos yet</h3>
      </div>
    );
  }

  const domoNodes = domos.map((domo) => {
    return (
      <div key={domo.id} className="domo">
        <img
          src="/assets/img/domoface.jpeg"
          alt="domo face"
          className="domoFace"
        />
        <h3 className="domoName">{domo.name}</h3>
        <h3 className="domoColor">{domo.color}</h3>
        <h3 className="domoAge">{domo.age}</h3>
      </div>
    );
  });

  return <div className="domoList">{domoNodes}</div>;
};

const App = () => {
  const [reloadDomos, setReloadDomos] = useState(false);

  return (
    <div>
      <div>
        <h1>Public Domos</h1>
      </div>
      <div id="domos">
        <DomoList domos={[]} reloadDomos={reloadDomos} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

window.onload = init;
