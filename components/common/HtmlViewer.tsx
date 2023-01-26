interface Props {
  htmlString?: string;
}

const HtmlViewer = (props: Props) => {
  const { htmlString = "" } = props;

  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
};

export default HtmlViewer;
