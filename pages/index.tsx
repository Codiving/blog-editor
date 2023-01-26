import { TypeButtonList as CodivingTypeButtonList } from "components/codiving";
import {
  BlogButton,
  HtmlViewer,
  Input,
  InputContainer
} from "components/common";
import produce from "immer";
import { useCallback, useState } from "react";
import {
  Blog,
  ClassNames,
  INIT_VALUE,
  List,
  TOTAL_BUTTON_LIST
} from "types/common";

const Home = () => {
  const [blog, setBlog] = useState<Blog>("codiving");
  const [list, setList] = useState<List[]>([]);
  const [curIndex, setCurIndex] = useState(0);
  const [htmlString, setHtmlString] = useState("");

  const onChangeBlog = useCallback((blog: Blog) => {
    setBlog(blog);
    setList([]);
    setCurIndex(0);
    setHtmlString("");
  }, []);

  const onAddList = (type: ClassNames) => {
    const item = TOTAL_BUTTON_LIST.find(el => el.type === type);
    if (!item) return;

    const newIndex = curIndex + 1;
    const newItem = { ...INIT_VALUE, type, label: item.label };

    const beforeList = list.slice(0, newIndex);
    const afterList = list.slice(newIndex);

    setList([...beforeList, newItem, ...afterList]);
    setCurIndex(prev => prev + 1);
  };

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
      <CodivingTypeButtonList {...{ blog, onAddList }} />
      <InputContainer>
        {list.map(({ type, value, label }, index) => {
          const id = String(index);
          return (
            <Input
              key={index}
              onChange={e => {
                const newValue = e.target.value;

                const newList = produce(list, draft => {
                  draft[index].value = newValue;
                });

                setList(newList);
              }}
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
      <HtmlViewer htmlString={htmlString} />
    </div>
  );
};

export default Home;
