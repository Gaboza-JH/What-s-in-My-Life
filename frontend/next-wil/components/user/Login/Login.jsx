import styles from "./Login.module.css"
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = (props) => {

  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');

  const userIdChangeHandler = (event) => { setUserId(event.target.value) };
  const pwChangeHandler = (event) => { setPw(event.target.value) };

  const [user, setUser] = useState(props.user)

  const login = () => {
    const data = {
      userId: userId,
      pw: pw
    }
    console.log(data);

    const getServerSideProps = async () => {
      try {
        const res = await fetch("http://localhost:8080/user", {
          method: 'POST',
          headers: {
            // json 형태로 데이터를 보내겠다는 의미
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // 직렬화

        });
        const user = await res.json();
        console.log(user);
        setUser(user)
        alert(user.msg);
        if (user.msg === "아이디가 존재하지 않습니다." || user.msg === "비밀번호를 다시 입력하세요.") {
          router.replace('/user/login');
        } else {
          router.replace('/')
        }
      } catch (error) {
        console.log(error)
        setUser(user)
      }
    };
    getServerSideProps();
  }

  return (
    <div className={styles['login']}>
      <div className={styles['wrapper']}>
        <div className={styles['right']}>
          <input className={styles['inputForm']} type="text" id="userId" value={userId} onChange={userIdChangeHandler} placeholder="UserId" />
          <input className={styles['inputForm']} type="password" id="pw" value={pw} onChange={pwChangeHandler} placeholder="Password" />
          <button className={styles['submit']} type="button" onClick={login}>Login</button>
        </div>
        <div className={styles['center']}>
          <div className={styles['line']} />
          <div className={styles['or']}>OR</div>
        </div>
        <div className={styles['left']}>
          <div className={styles['kakao']}>
            <img src="/img/kakaologo.png" alt="error" className={styles['icon']} />
            KAKAO Login
          </div>
          <div className={styles['google']}>
            <img src="/img/kakaologo.png" alt="error" className={styles['icon']} />
            Google Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;