import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import Loading from './Loading';

const RecruitFormContainer = styled.main`
  margin-top: 100px;
  width: 700px;
  color: white;
  font-size: 16px;

  #kakao-map {
    width: 100%;
    height: 400px;
  }
`;

const RecruitForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > button:last-child {
    margin-bottom: 50px;
  }

  table {
    margin: 20px 0px;
    border-spacing: 20px 30px;
    tr {
      > td:nth-child(1) {
        white-space: nowrap;
        width: 160px;
      }
      > td:nth-child(2) {
        width: 100%;
        position: relative;
      }
    }
    tr:nth-child(1),
    tr:nth-child(2),
    tr:nth-child(3),
    tr:nth-child(4),
    tr:nth-child(5),
    tr:nth-child(6),
    tr:nth-child(7) {
      input,
      textarea {
        padding: 5px;
        font-size: 16px;
        width: 100%;
        border: none;
        outline: 1px solid rgb(120, 120, 120);
        background-color: rgba(255, 255, 255, 0);
        color: white;
        &:focus {
          outline: 1px solid rgb(170, 170, 170);
        }
        &::placeholder {
          font-style: italic;
          font-size: 14px;
        }
        &:disabled {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      textarea {
        height: 200px;
      }
    }
    tr:nth-child(4),
    tr:nth-child(5) {
      input {
        width: 100px;
        margin-right: 10px;
      }
    }
    tr:nth-child(8),
    tr:nth-child(9) {
      label {
        margin-right: 10px;
      }
    }
    tr:nth-child(11) {
      input {
        width: 300px;
        margin-right: 10px;
      }
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

interface RecruitFormInput {
  recruitTagDtos: { tagId: number; tagName: string; emoji: string }[];
  title: string;
  body: string;
  date: string;
  require: number;
  minRequire: number;
  location: string;
  lat: number;
  lon: number;
  sex: 'Both' | 'Male' | 'Female';
  ages: number[];
  heart: number;
  image: string;
  tagSearch: string;
}

const KakaoMapForClick = ({
  control,
  setValue,
  currentLat,
  currentLon,
}: any) => {
  const lat = useWatch({
    control,
    name: 'lat',
    defaultValue: currentLat,
  });
  const lon = useWatch({
    control,
    name: 'lon',
    defaultValue: currentLon,
  });
  return <KakaoMapClick latitude={lat} longitude={lon} setValue={setValue} />;
};

const EditRecruit = () => {
  const [recruitData, setRecruitData] = useState<RecruitDataProps | null>();
  const { recruitId } = useParams();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = Number(useSelector((state: any) => state.memberId));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`)
      .then((res) => {
        setRecruitData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RecruitFormInput>({});

  const onSubmit = (data: RecruitFormInput) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`, {
        ...data,
        memberId,
        headers: {
          Authorization: `${accessToken}`,
          Refresh: `${refreshToken}`,
        },
      })
      .then(() => {
        navigate('/recruits');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { location } = useCurrentLocation();

  return (
    <RecruitFormContainer>
      <h1>모집 게시글 수정하기</h1>
      <span>게시글을 수정해보세요!</span>
      {recruitData ? (
        <RecruitForm onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="title">제목</label>
                </td>
                <td>
                  <input
                    id="title"
                    type="text"
                    defaultValue={recruitData.title}
                    {...register('title', {
                      required: '제목은 필수항목입니다',
                    })}
                  />
                  <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="body">내용</label>
                </td>
                <td>
                  <textarea
                    id="body"
                    defaultValue={recruitData.body}
                    {...register('body', { required: '내용은 필수항목입니다' })}
                  />
                  <ErrorMessage>{errors?.body?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="date">모임 일시</label>
                </td>
                <td>
                  <input
                    id="date"
                    type="datetime-local"
                    defaultValue={recruitData.date}
                    disabled={recruitData.applies.length > 0}
                    {...register('date', {
                      required: '모임 일시는 필수항목입니다',
                    })}
                  />
                  <ErrorMessage>{errors?.date?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="require">총 모집 인원</label>
                </td>
                <td>
                  <input
                    id="require"
                    type="number"
                    defaultValue={recruitData.require}
                    disabled={recruitData.applies.length > 0}
                    {...register('require', {
                      required: '총 모집 인원은 필수항목입니다',
                      valueAsNumber: true,
                    })}
                  />
                  명<ErrorMessage>{errors?.require?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="minRequire">모임의 최소충족인원</label>
                </td>
                <td>
                  <input
                    id="minRequire"
                    type="number"
                    defaultValue={recruitData.minRequire}
                    disabled={recruitData.applies.length > 0}
                    {...register('minRequire', {
                      required: '최소충족인원은 필수항목입니다',
                      valueAsNumber: true,
                      validate: {
                        smallerThanRequire: (value) =>
                          value > getValues().require
                            ? '최소모집인원은 총 모집인원 이하여야 합니다'
                            : true,
                      },
                    })}
                  />
                  명<ErrorMessage>{errors?.minRequire?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="location">모임 장소</label>
                </td>
                <td>
                  <input
                    id="location"
                    type="text"
                    defaultValue={recruitData.location}
                    disabled={recruitData.applies.length > 0}
                    {...register('location', {
                      required: '모임 장소는 필수항목입니다',
                    })}
                  />
                  <ErrorMessage>{errors?.location?.message}</ErrorMessage>
                </td>
              </tr>
              {recruitData.applies.length === 0 && (
                <tr className="mapCon">
                  <td>
                    <label htmlFor="latlon">위치 정보</label>
                  </td>
                  <td>
                    {location && (
                      <KakaoMapForClick
                        control={control}
                        setValue={setValue}
                        currentLat={location.latitude}
                        currentLon={location.longitude}
                      />
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Button
            value="글 작성하기"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </RecruitForm>
      ) : (
        <Loading />
      )}
    </RecruitFormContainer>
  );
};

export default EditRecruit;
