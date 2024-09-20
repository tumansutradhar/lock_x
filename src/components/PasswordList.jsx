import React from "react";
import { useNavigate } from "react-router-dom"; //new
import { getFaviconUrl } from "./getFaviconUrl";
import ArrowForward from "../assets/ArrowForward.svg";

const PasswordList = ({ passwords, onSelect }) => {
  const navigate = useNavigate(); //new

  return (
    <div className="">
      {passwords.length === 0 ? (
        <p className="">No passwords saved.</p>
      ) : (
        passwords.map((password) => (
          <div key={password.id} className="w-full h-20 flex items-center justify-between p-3 border-b-black border-[1px]" onClick={() => {
            if (window.innerWidth >= 768) {
              onSelect(password);
            }
          }}>
            <div className="flex items-center gap-3">
              <div className="">
                <img src={getFaviconUrl(password.site)} />
              </div>
              <div>
                <h4>{password.sitename}</h4>
                <p>{password.email}</p>
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={() => navigate(`/password/${password.id}`)}> {/*new*/}
                <img src={ArrowForward} alt="View details" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PasswordList;
