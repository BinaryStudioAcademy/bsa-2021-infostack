const Page: React.FC<{ title: string }> = (props) => {

  // const { testvalue } = props;
  return (
    <h4>Page page{props.title}</h4>
    // <div className="comments">
    //   {testvalue.map(comment =>
    //     <div key={comment.id} className="comment">
    //       <span>{comment.title}</span>
    //       {comment.children && <Page testvalue={comment.children}/>}
    //     </div>,
    //   )}
    // </div>
  );
};

export default Page;
