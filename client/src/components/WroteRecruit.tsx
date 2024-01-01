import MyRecruitItem from './MyRecruitItem';
import RecruitDataProps from '../interfaces/RecruitDataProps';

const WroteRecruit = ({ data }: any) => (
  <div>
    {data.length === 0 ? (
      <div>글이 아직 없습니다</div>
    ) : (
      data.map((e: RecruitDataProps) => (
        <MyRecruitItem
          key={e.recruitId}
          title={e.title}
          quota={`${e.applies.length}/${e.require}`}
          tags={e.recruitTags}
          dueDate={e.date}
          id={e.recruitId}
        />
      ))
    )}
  </div>
);
export default WroteRecruit;
