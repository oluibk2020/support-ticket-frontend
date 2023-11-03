import { useState , useEffect} from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //create a dispatch
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //extract data from redux using 
  const {user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user,message, navigate, dispatch])

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else{
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Register;
