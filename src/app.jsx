import { useState } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    const options = { length, lowercase, uppercase, numbers, symbols };

    const res = await fetch("http://localhost/3001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options)
    });

    const data = await res.json();
    setPassword(data.password);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Generador de Contraseñas</h2>

      <label>
        Longitud:
        <input
          type="number"
          min="4"
          max="50"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </label>

      <div>
        <label>
          <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
          Minúsculas
        </label>
        <label>
          <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
          Mayúsculas
        </label>
        <label>
          <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />
          Números
        </label>
        <label>
          <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
          Símbolos
        </label>
      </div>

      <button onClick={generatePassword}>Generar</button>

      {password && (
        <div>
          <h3>Contraseña generada:</h3>
          <p>{password}</p>
        </div>
      )}
    </div>
  );
}
