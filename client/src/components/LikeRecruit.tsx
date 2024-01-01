import MyRecruitItem from './MyRecruitItem';
import RecruitLikeProps from '../interfaces/RecruitLikeProps';

const LikeRecruit = ({ data }: any) => (
  <div>
    {
      data.length === 0 ? (
        <div>글이 아직 없습니다</div>
      ) : (
        data.map((e: RecruitLikeProps) => (
          <MyRecruitItem
            key={e.recruitId}
            title={e.title}
            quota={` ${e.applyCount}/${e.require}`}
            tags={e.recruitTags}
            dueDate={e.date}
            id={e.recruitId}
          />
        ))
      )
      // free가 생기면 여기도 위 recruits랑 똑같이 삼항 넣어주자
    }
  </div>
);
export default LikeRecruit;
