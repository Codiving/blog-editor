import { TypeButtonList as CodivingTypeButtonList } from "components/codiving";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DragUpdate,
  DropResult
} from "react-beautiful-dnd";
import {
  BlogButton,
  HtmlViewer,
  Input,
  InputContainer,
  StickyHeader
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

const QUERY_ATTR = "data-rbd-drag-handle-draggable-id";
const INIT_PLACEHOLDER_PROPS = {
  clientHeight: 0,
  clientWidth: 0,
  clientY: 0,
  clientX: 0
};

const reorder = (list: List[], startIndex: number, endIndex: number) => {
  const result = produce(list, draft => {
    const [removed] = draft.splice(startIndex, 1);
    draft.splice(endIndex, 0, removed);
  });

  return result;
};

const copyToClipboard = (htmlString: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(htmlString)
      .then(() => console.log("복사 완료"));
  } else {
    if (!document.queryCommandSupported("copy")) return;

    const textarea = document.createElement("textarea");
    textarea.value = htmlString;
    textarea.style.top = "0px";
    textarea.style.left = "0px";
    textarea.style.position = "fixed";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};

const Home = () => {
  const [blog, setBlog] = useState<Blog>("codiving");
  const [list, setList] = useState<List[]>([
    {
      type: "title",
      label: "제목",
      value: "",
      bold: [],
      red: [],
      yellow: [],
      green: []
    }
  ]);
  const [curIndex, setCurIndex] = useState(0);
  const [htmlString, setHtmlString] = useState("");
  const [placeholderProps, setPlaceholderProps] = useState(
    INIT_PLACEHOLDER_PROPS
  );

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

  // 내용 추가 : crtl + Enter
  const onAddContent = (index: number) => {
    const before = list.slice(0, index + 1);
    const after = list.slice(index + 1);

    const newItem: List = {
      ...INIT_VALUE,
      type: "content_content1",
      label: "내용1"
    };
    const newList = [...before, newItem, ...after];

    setList(newList);
  };

  const generateJsToHtml = useCallback(() => {
    const result = list.map(item => {
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

    return html.div({}, result).toHtmlText({ pretty: true });
  }, [list]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination?.index) return;

    setPlaceholderProps(INIT_PLACEHOLDER_PROPS);

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index
    );
    setList(newList);
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (!update.destination) return;

    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${QUERY_ATTR}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) return;
    if (!draggedDOM.parentNode) return;
    if (!draggedDOM.parentNode.children) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const clientY =
      parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as Element).paddingTop
      ) +
      Array.from(draggedDOM.parentNode.children)
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as Element).paddingLeft
      )
    });
  };

  useEffect(() => {
    const htmlString = generateJsToHtml();
    setHtmlString(htmlString);
  }, [generateJsToHtml, list]);

  return (
    <div>
      <BlogButton
        {...{
          value: blog,
          onChange: onChangeBlog,
          onCopy: () => {
            const htmlString = generateJsToHtml();
            copyToClipboard(htmlString);
          }
        }}
      />
      <StickyHeader>
        <Manual />
        <CodivingTypeButtonList {...{ blog, onAddList }} />
      </StickyHeader>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <InputContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map(({ type, value, label }, index) => {
                const id = String(index);
                return (
                  <Draggable key={index} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                              // 내용 추가
                              else if (e.metaKey || e.ctrlKey) {
                                onAddContent(index);
                              }
                              // 다음 칸으로 이동
                              else if (!e.nativeEvent.isComposing) {
                                onMoveNextInput(index);
                              }
                            }
                            // 현재 줄 삭제 : crtl + Backspace
                            else if (
                              (e.metaKey || e.ctrlKey) &&
                              e.code === "Backspace"
                            ) {
                              onDelete(index)();
                            }
                            // 볼드 처리
                            else if (
                              (e.metaKey || e.ctrlKey) &&
                              e.code === "KeyB"
                            ) {
                              const selected = window.getSelection();
                              if (!selected) return;

                              const boldText = selected.toString();

                              if (!boldText.length) return;
                              const newList = produce(list, draft => {
                                draft[index].bold = Array.from(
                                  new Set([...draft[index].bold, boldText])
                                );
                              });

                              setList(newList);
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
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </InputContainer>
          )}
        </Droppable>
      </DragDropContext>
      <HtmlViewer htmlString={htmlString} />
    </div>
  );
};

export default Home;
