// import { First_Page } from "./First_Page"
// import { Second_Page } from "./Second_Page";
// import { UseState } from "./useState";
// import { UseEffect } from "./UseEffect";
// import { CountdownTimer } from "./firstTwoHookPractice";
// import { ThemeProvider } from "./UseContext/ThemeProvider";
// import { UseContext } from "./UseContext/UseContext";
// import { UseMemo } from "./UseMemo";
// import { UseReducer } from "./UseReducer";
// import { UseReducer2 } from "./UseReducer2";
// import { UseRef } from "./UseRef";
// import UseContextApp from "./UseContext/UseContextExample";
// import { FilterExample } from "./UseMemoExample";
// import { ShoppingCart } from "./UseReducerExample";
// import { TimerExample } from "./UseRefExample";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { First_Page } from "./First_Page";
import { Second_Page } from "./Second_Page";
import { UseMemo } from "./UseMemo";
import { ThemeProvider } from "./UseContext/ThemeProvider";
import { UseContext } from "./UseContext/UseContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="first-page" element={<First_Page />} />
          <Route
            path="second-page"
            element={<Second_Page Title={"React-Js"} Disc={"React cards"} />}
          />
          <Route path="use-memo" element={<UseMemo />} />
          <Route
            path="use-context"
            element={
              <ThemeProvider>
                <UseContext />
              </ThemeProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
