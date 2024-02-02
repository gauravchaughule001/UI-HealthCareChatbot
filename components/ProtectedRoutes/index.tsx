import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import ChildComponent from "../ChildComponent";
import { Toaster } from "react-hot-toast";

const protectedRoute = (Component: any) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      if (counter === 0) {
        isAuthorized();
      } else {
        let interval: any;
        interval = setInterval(async () => {
          isAuthorized();
        }, 8000);
        return () => {
          clearInterval(interval);
        };
      }
    }, []);

    const isAuthorized = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/auth/check`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        if (response.data.status != 200) {
          setAuthorized(false);
          router.push("/");
        } else {
          setAuthorized(true);
        }
      } catch (e: any) {
        if (e?.response) {
          setAuthorized(false);
          router.push("/");
        } else {
          router.push("/InternalServerError");
        }
      } finally {
        setCounter(counter + 1);
      }
    };

    return (
      authorized && (
        <RecoilRoot>
          <ChildComponent>
            <Component {...props} />
          </ChildComponent>
        </RecoilRoot>
      )
    );
  };

  return AuthWrapper;
};

export default protectedRoute;
