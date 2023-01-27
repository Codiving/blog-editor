import { TypeButtonList as CodivingTypeButtonList } from "components/codiving";
import {
  BlogButton,
  HtmlViewer,
  Input,
  InputContainer
} from "components/common";
import Manual from "components/common/Manual";
import produce from "immer";
import { html } from "js-to-html";
import { useCallback, useEffect, useState } from "react";
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

  // 줄바꿈 추가 : crtl + shift + Enter
  const onAddBr = (index: number) => {
    const before = list.slice(0, index + 1);
    const after = list.slice(index + 1);

    const newItem: List = {
      ...INIT_VALUE,
      type: "br"
    };
    const newList = [...before, newItem, ...after];

    setList(newList);
  };

  // 다음 칸으로 이동 : Enter
  const onMoveNextInput = (index: number) => {
    let nextIndex = index;
    do {
      nextIndex += 1;
      const nextInput = document.getElementById(String(nextIndex));
      if (nextInput && nextInput.className.includes("input")) {
        nextInput.focus();
        break;
      }
    } while (nextIndex <= list.length);
  };

  useEffect(() => {
    const result: any = list.map(item => {
      if (item.type === "br") return html.br();

      const defaultClassName: ClassNames[] = [item.type];
      const classNames: ClassNames[] = [...defaultClassName];

      let text = item.value;

      item.bold.forEach(bold => {
        text = text.replaceAll(bold, `|${bold}|`);
      });
      if (item.bold.length) {
        return html.p(
          {
            class: classNames.join(" ")
          },
          text.split("|").map(el => {
            if (item.bold.includes(el)) return html.span({ class: "bold" }, el);
            return el;
          })
        );
      }

      return html.p({ class: classNames.join(" ") }, item.value);
    });

    setHtmlString(html.div({}, result).toHtmlText({ pretty: true }));
  }, [list]);

  return (
    <div>
      <Manual />
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
              onKeyDown={e => {
                if (e.key === "Enter") {
                  // 줄바꿈 추가
                  if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
                    onAddBr(index);
                  }
                  // 다음 칸으로 이동
                  else if (!e.nativeEvent.isComposing) {
                    onMoveNextInput(index);
                  }
                }
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
