import { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";

export const Login = ({ inputs, buttonValue, reuperation, auth, setRedirect }) => {
  const [inputPrints, setInputsPrint] = useState([
    { type: "text", placeholder: "Usuario", id: "user" },
    { type: "password", placeholder: "Contraseña", id: "pass" },
  ]);
  const [recuperationPrints, setRecuperationPrints] = useState([
    { to: "/olvidoDatos", value: "Recuperar datos" },
    { to: "/desbloquear", value: "Desbloquear usuario" },
  ]);

  const [button, setButton] = useState("Enviar");
  const [msgInfo, setMsgInfo] = useState("");
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (inputs) {
      setInputsPrint(inputs);
    }

    if (buttonValue) {
      setButton(buttonValue);
    }

    if (reuperation) {
      setRecuperationPrints(reuperation);
    }
  }, []);

  const valueOfInputs = () => {
    const user = document.querySelector("#user").value;
    const pass = document.querySelector("#pass").value;
    console.log({ user, pass });
    return { user, pass };
  };

  const handleLogin = async () => {
    try {
      const { user, pass } = valueOfInputs();
      const result = await fetch("http://localhost:7878/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cors: "cors",
        body: JSON.stringify({
          user,
          password: pass,
        }),
      });

      const data = await result.json();
      console.log(data);
      if (data.profiles) auth(true);
      if(data.message){
        setModal(true)
        setMsgInfo(data.message)
      }

      if(data.error){
        setModal(true)
        setMsgInfo(data.error)
      }

      setRedirect("/setProfile")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-form">
        {inputPrints.map((input, index) => {
          return (
            <input
              key={index}
              type={input.type}
              className="login-input"
              placeholder={input.placeholder}
              id={input.id}
            />
          );
        })}

        <button onClick={handleLogin}>{button}</button>

        <div className="recuperacion">
          {recuperationPrints.map((link, index) => {
            return (
              <Link key={index} to={link.to}>
                {link.value}
              </Link>
            );
          })}
        </div>
      </div>

      {modal && (
        <Modal isOpen={modal} onClose={()=>setModal(false)}>
          <h3>Alerta</h3>
          <p>{msgInfo}</p>
        </Modal>
      )}
    </>
  );
};
