import { useEffect, useState } from "react";
import "./index.css";
import MyCalendar from "./components/Calendar";
import Timer from "./components/Timer";

function App() {
  const [step, setStep] = useState(1);
  const [isActiveId, setIsActiveId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime,setSelectedTime] = useState({})
  const [data, setData] = useState([]);

  const [date,setDate] = useState(null)
  const [userData, setUserData] = useState({
    userName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNumber: "",
    userSelectedDoctor: "",
    userSelectedService: "",
  });
  const steps = [
    { id: 1, text: "Stuff", number: 1 },
    { id: 2, text: "Service", number: 2 },
    { id: 3, text: "Date & Time", number: 3 },
    { id: 4, text: "Confirmation", number: 4 },
  ];

  useEffect(()=>{
    console.log(date);
    
  },[date])

  useEffect(() => {
    fetch("http://localhost:3000/doctorData")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = async () => {
    const postedData = {
      userName: userData.userName,
      userLastName: userData.userLastName,
      userEmail: userData.userEmail,
      userNumber: userData.userPhoneNumber,
      userSelectedDoctor: selectedDoctor.name,
      userSelectedService: selectedService.name,
    };
    fetch("http://localhost:3000/selectedData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postedData),
    });

    // console.log("Sent:", postedData);
    alert("Randevu göndərildi!");
    setUserData({
      userName: "",
      userLastName: "",
      userEmail: "",
      userPhoneNumber: "",
      userSelectedDoctor: "",
      userSelectedService: "",
    });
    setStep(1);
  };



  const activeBtn =  userData.userName && userData.userLastName && userData.userEmail; 
  return (
    <div className="container">
      <div className="box">
        <div className="navbar">
          <div className="navbar-items">
            {steps.map((item) => {
              const isActiveStep = step === item.id;
              const isCompletedStep = step > item.id;

              return (
                <div className="number-name" key={item.id}>
                  <p
                    className={`number flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                      isActiveStep
                        ? "done"
                        : isCompletedStep
                        ? "complete"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {isCompletedStep ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 28 26"
                      >
                        <path
                          fill="white"
                          d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"
                        />
                      </svg>
                    ) : (
                      item.number
                    )}
                  </p>
                  <p className="section-name">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="content">
          {step === 1 && (
            <>
              <div className="section-header">
                <h4>Select Service</h4>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </p>
              </div>
              <div className="carts">
                {data.map((item) => (
                  <div
                    className={`cart ${isActiveId === item.id ? "active" : ""}`}
                    onClick={() => {
                      setIsActiveId(item.id);
                      setSelectedDoctor(item);
                      setSelectedService(null);
                    }}
                    key={item.id}
                  >
                    <div className="img-nameBox">
                      <img
                        src={item.imgUrl}
                        alt="doctor"
                        className="doctor-img"
                      />
                      <div className="name-desc">
                        <span className="cart-name">{item.name}</span>
                        <span className="cart-desc">{item.gmail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="section-header">
                <h4>Select Service</h4>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </p>
              </div>
              <div className="carts">
                {selectedDoctor.work.map((service) => (
                  <div
                    className={`cart  ${
                      selectedService?.id === service.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedService(service)}
                    key={service.id}
                  >
                    <div className="service-imgAndName">
                      <div>
                        <img
                          src={service.imgUrl}
                          alt={service.name}
                          className="doctor-img"
                        />
                      </div>
                      <div className="name-desc">
                        <span className="cart-name">{service.name}</span>
                        <span className="cart-desc">{service.time}</span>
                      </div>
                    </div>

                    <p className="cart-price">{service.price.toFixed(2)}$</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="section-header">
                <h4>Select Service</h4>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </p>
              </div>
              <div className="calendar-timer">
                <div className="calendar">
                  <MyCalendar setDate={setDate} />
                </div>

                <div className="timer-box-text">
                  <span className="timer-text">Time</span>

                  <Timer selectedService={selectedService} setSelectedTime = {setSelectedTime} />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="section4">
              <div className="section-header">
                <h4>Select Service</h4>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </p>
              </div>
              <form>
                <div className="box-input">
                  <div className="label-input">
                    <label htmlFor="name">First Name*</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Nihat"
                      required
                      value={userData.userName}
                      onChange={(e) =>
                        setUserData({ ...userData, userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="lastname">Last Name*</label>
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Məmmədov"
                      required
                      value={userData.userLastName}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          userLastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="box-input">
                  <div className="label-input">
                    <label htmlFor="email">E-mail*</label>
                    <input
                      value={userData.userEmail}
                      onChange={(e) =>
                        setUserData({ ...userData, userEmail: e.target.value })
                      }
                      required
                      type="email"
                      id="email"
                      placeholder="nihatmemmedov@gmail.com"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="055 555 55 55"
                      value={userData.userPhoneNumber}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          userPhoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </form>

              <div className="report">
                <span>Note</span>
                <span>Staff: {selectedDoctor.name}</span>
                <span>Service: {selectedService.name}</span>
                <span>Date:{date} / {selectedTime.start} - {selectedTime.end}</span>
              </div>
            </div>
          )}

          <div className={` btn-box ${step == 1 ? "step1" : ""}`}>
            {step > 1 && (
              <button
                className="btn btn-back"
                onClick={() => setStep((s) => s - 1)}
              >
                BACK
              </button>
            )}
            <div className="next-btn-box">
              {step == 4 && (
                <button className="next-btn booking-btn" onClick={handleSubmit} disabled={!activeBtn} type="submit">
                  CONFIRMATION BOOKING
                </button>
              )}
              {step < 4 && (
                <button
                  className={`next-btn btn-primary`}
                  onClick={() => {
                    setStep((s) => s + 1);
                  }}
                  disabled={
                    (step === 1 && !selectedDoctor) ||
                    (step === 2 && !selectedService) ||
                    (step ===3 && selectedTime.id == 0)
                  }
                >
                  NEXT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
