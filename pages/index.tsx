import { TypeButtonList as CodivingTypeButtonList } from "components/codiving";
import { BlogButton, Input, InputContainer } from "components/common";
import { useCallback, useState } from "react";
import { CODIVING_TYPE_LIST } from "types/codiving";
import { Blog, INIT_VALUE, List, TypeList } from "types/common";
import { PERSONAL_TYPE_LIST } from "types/personal";

const Home = () => {
  const [blog, setBlog] = useState<Blog>("codiving");
  const [list, setList] = useState<List[]>([]);
  const [curIndex, setCurIndex] = useState(0);
  const [htmlString, setHtmlString] = useState("");

  const onChangeBlog = useCallback((blog: Blog) => {
    setBlog(blog);
  }, []);

  const onAddList = useCallback(
    (type: TypeList) => {
      const item =
        blog === "codiving"
          ? CODIVING_TYPE_LIST.find(el => el.type === type)
          : PERSONAL_TYPE_LIST.find(el => el.type === type);

      if (!item) return;

      const newIndex = curIndex + 1;
      const newItem = { ...INIT_VALUE, type, label: item.label };

      const beforeList = list.slice(0, newIndex);
      const afterList = list.slice(newIndex);

      setList([...beforeList, newItem, ...afterList]);
    },
    [blog, curIndex, list]
  );

  // TODO: 추후 리팩토링 하기
  const onDelete = useCallback(
    (index: number) => () => {
      setList(prev => prev.filter((_, _index) => _index !== index));
    },
    []
  );

  return (
    <div>
      <BlogButton
        {...{
          value: blog,
          onChange: onChangeBlog
        }}
      />
      <CodivingTypeButtonList {...{ onAddList }} />
      <InputContainer>
        {list.map(({ type, value, label }, index) => {
          const id = String(index);
          return (
            <Input
              key={index}
              {...{
                id,
                type,
                value,
                label,
                onDelete: () => onDelete(index),
                onFocus: () => setCurIndex(index)
              }}
            />
          );
        })}
      </InputContainer>
    </div>
  );
};

export default Home;
