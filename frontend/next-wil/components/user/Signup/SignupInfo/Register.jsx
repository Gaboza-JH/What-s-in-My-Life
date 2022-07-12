import { useState } from "react";
import styles from "./Register.module.css";
import FormInput from "./FormInput";
import { useRouter } from 'next/router';

const Register = () => {

  const router = useRouter();

  const [values, setValues] = useState({
    id: null,
    password: null,
    confirmPassword: null,
    name: null,
    nickname: null,
    favoritfood: null,
    location: null
  });

  const inputs = [
    {
      id: 1,
      name: "id",
      type: "text",
      placeholder: "id",
      errorMessage:
        "사용자 이름은 3-16자여야 하며 특수 문자를 포함할 수 없습니다!",
      label: "사용하실 ID를 입력해주세요.",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "암호는 8-20자여야 하며 최소 1개의 문자, 1개의 숫자 및 1개의 특수 문자를 포함해야 합니다",
      label: "사용하실 PW를 입력해주세요.",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "PW가 서로 일치하지 않습니다.",
      label: "PW를 한번 더 입력해주세요. ",
      pattern: values.password,
      required: true,
    },
    {
      id: 4,
      name: "name",
      type: "text",
      placeholder: "name",
      label: "회원님의 이름을 기입해주세요",
      required: true,
    },
    {
      id: 5,
      name: "nickname",
      type: "text",
      placeholder: "nickname",
      label: "ToGet:All 에서 사용하실 닉네임을 설정해주세요",
      required: true,
    },
    {
      id: 6,
      name: "favoritfood",
      type: "text",
      placeholder: "favoritfood",
      label: "회원님이 선호하는 음식은 무엇인가요?",
      required: false,
    },
    {
      id: 7,
      name: "location",
      type: "text",
      placeholder: "location",
      label: "회원님이 사시는 지역을 설정해주세요.",
      required: false,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const addUser = () => {
    const data =
    {
      userId: values.id,
      pw: values.password,
      name: values.name,
      nickName: values.nickname,
      preferFoodCategory: values.favoritfood,
      location: values.location
    }

    const getServerSideProps = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/signup", {
          method: 'POST',
          headers: {
            // json 형태로 데이터를 보내겠다는 의미
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // 직렬화
        });
        const user = await res.json();
        console.log(user);
        setValues(user);
        alert(user.msg);
        if (user.msg === "회원가입이 성공적으로 처리되었습니다.") {
          router.replace('/user/login');
        } else {
          window.location.replace("/user/signup")
        }
      } catch (error) {
        console.log(error)
      }
    };
    getServerSideProps();
  }
  return (
    <div className={styles['register']}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        <h1 className={styles['h1']}>Toget:All</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className={styles['button']} type="button" onClick={addUser}>회원가입</button>
      </form>
    </div>
  );
};

export default Register;
