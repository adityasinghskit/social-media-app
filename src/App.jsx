import Header from "./component/Header";
import Footer from "./component/Footer";
import SideBar from "./component/SideBar";
const App = () => {
  return (
    <div className="app-container">
      <SideBar></SideBar>
      <div className="content">
        <Header></Header>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default App;
