import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 0.3rem;
  width: 7rem;
  height: 3rem;
  margin: 0.05rem;
  input[type='checkbox'] {
    bottom: 0.5rem;
    margin-top: 0.75rem;
    top: 0.25rem;
    flex: 1;
  }
  label {
    font-size: 10px;
    height: auto;
    flex: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

interface PropsType {
  tagName: string;
  emoji: string;
  tagId: number;
  register: any;
  fields: { tagId: number; tagName: string }[];
  append: any;
  remove: any;
  control: any;
}

const Tag = ({ register, tagName, emoji, tagId }: PropsType) => {
  const inputValue = {
    tagId,
    tagName,
    emoji,
  };

  return (
    <TagContainer>
      <input
        type="checkbox"
        name={tagName}
        value={inputValue}
        {...register('tags')}
      />
      <label htmlFor={tagName}>
        {tagName}
        <br />
        {emoji}
      </label>
    </TagContainer>
  );
};
export default Tag;
