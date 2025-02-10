import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-5 text-center mb-4">
        <i className="fab fa-react" /> React File Uploader
      </h4>

      <FileUpload />
    </div>
  );
}

export default App;
