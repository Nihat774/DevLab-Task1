import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorCart() {
    
       const [data, setData] = useState([]);
      const [isActiveId, setIsActiveId] = useState(null);
      const [clickedData, setClickedData] = useState({});
      const navigate = useNavigate();
      // GET doctorData
      useEffect(() => {
        fetch("http://localhost:3000/doctorData")
          .then((res) => res.json())
          .then((data) => setData(data));
      }, []);
    
      useEffect(() => {
        const found = data.find((item) => item.id === isActiveId);
        if (found) setClickedData(found);
      }, [isActiveId, data]);
    
      const handleSubmit = async (id) => {
        // fetch("http://localhost:3000/selectedData", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(clickedData),
        // });
    
        // console.log("Sent:", clickedData);
        navigate(id);
      };
  return (
    <div>
      <div className="box"></div>
    <div className="navbar">
      {/* <button className="menu-toggle" onClick={toggleNavbar}>
        <img
          width="16"
          height="16"
          src="https://img.icons8.com/officexs/16/list.png"
          alt="list"
        />
      </button> */}
      <div className={`navbar-items ${isOpen ? "active" : ""}`}>
        {steps.map((item) => {
          return (
            <div className="number-name" key={item.id}>
              <p className="number">{item.number}</p>
              <p className="section-name">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
      <div className="stuff-section">
            <div>
              <div className="header">
                <p className="header-text">Select Stuff</p>
                <p className="close-icon">x</p>
              </div>

              <div className="carts">
                {data.map((item) => {
                 const isActive = item.id == isActiveId;
                  return (
                    <div
                      className={`${isActive ? "active" : ""} cart1`}
                      key={item.id}
                      onClick={() => setIsActiveId(item.id)}
                    >
                      <div>
                        <img src={item.imgUrl} alt={item.name} />
                      </div>

                      <div>
                        <p className="cart-name">{item.name}</p>
                        <p className="cart-desc">{item.gmail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="btn-box">
              <button
                className="next-btn1"
                onClick={() => handleSubmit(clickedData.id)}
                disabled={!clickedData.id}
              >
                NEXT
              </button>
            </div>
          </div>
          </div>
          
  )
}

export default DoctorCart
