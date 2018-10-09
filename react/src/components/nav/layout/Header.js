import React from "react";
import TopHello from "./TopHello";
import { navigate } from "gatsby";
import Button from "../../../reactLIB/Button";
//import Button from "@material-ui/core/Button";
import BackButton from "./BackButton";

const Header = ({ location }) => {
  return (
    <div className="flexGrow md-grid md-grid--stacked">
      <header className="headerchat md-grid md-grid--no-spacing">
        <div className="md-cell md-cell-4">
          <BackButton location={location} />
        </div>
        <div className="md-cell md-cell-4">
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="material"
            flat
            icon="home"
          />
        </div>
        <div className="md-cell md-cell-4">
          <TopHello />
        </div>
      </header>
    </div>
  );
};

export default Header;
