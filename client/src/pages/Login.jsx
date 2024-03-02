import { useState } from "react";
import "../css/login.css";
import { useAuth } from "../../store/auth";
import {useNavigate} from "react-router-dom";
export const Login = () => {
  
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
      // let handle the input field value
      const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
          const response = await fetch('http://localhost:3000/api/auth/login',{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify(user),  
         });
         
              if(response.ok){
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                localStorage.setItem('role',res_data.role);
               
                setUser({email: "", password: "" });
                
                if(res_data.role === "pitcher"){
                  navigate("/pitches");
                }else{
                  navigate("/investor");
                }
                alert("Login Successful");
              
              }else{
                alert("Invalid Credentials");
                console.log("Invalid Credentials");
              }
        } catch (error) {
          console.log(error);
        }
        console.log(user);
      };


  return (
    <>
      <section id="colorblock">
        <main >
          <div className="section-registration">
         
           
             
              {/* our main registration code  */}
              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                 
                <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                
                  
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
              <div className="registration-image reg-img">
                <img
                  src="/images/check.png"
                  alt="a nurse with a cute look"
                  className="size"
                 
                />
              </div>
            </div>
           
        
          
        </main>
      </section>
    </>
  );
};