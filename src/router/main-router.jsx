import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import Table from "../page/table";
import Graph from "../page/graph/graph";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<Table />} />
      <Route path="/graph" element={<Graph />} />
    </Routes>
  );
}
