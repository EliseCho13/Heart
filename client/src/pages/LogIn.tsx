import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogInContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 60vh;
`;

const LogInForm = styled.form`
  width: auto;
  height: 60%;
  padding: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  border-radius: 10px;

  label,
  input {
    width: 400px;
    height: 30px;
    border-radius: 5px;
    border: none;
  }
  input {
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  button {
    width: 130px;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 8px 14px;
    transition: 0.2s ease-in-out;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      background-color: var(--neon-yellow);
      color: black;
      transition: 0.2s ease-in-out;
    }
  }
`;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //   console.log(watch('Email'));

  return (
    <LogInContainer>
      <LogInForm
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <div>로그인</div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          {...register('email', { required: true })}
          defaultValue="abc@gmail.com"
        />
        {errors.email && <div>이메일을 입력하세요</div>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: true, maxLength: 10 })}
        />
        {errors.password && <div>비밀번호를 입력하세요</div>}
        <ButtonContainer>
          <Link to="/search-password">
            <button type="button">비밀번호 찾기</button>
          </Link>
          <button type="submit">로그인</button>
          <Link to="/signup">
            <button type="button">회원가입</button>
          </Link>
        </ButtonContainer>
      </LogInForm>
    </LogInContainer>
  );
};
export default LogIn;
