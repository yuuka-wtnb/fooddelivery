import React,{createContext} from "react";

const AppContext = createContext();

export default AppContext;

//_app.jsの<component>というコンポーネントをラッピングすることで
// そこで指定する全てのvalueというものを全てのコンポーネントで使用することができる