import "./menu.css";

const Menu = (props: {onchange:Function}) => {
  const handleChange = (event)=> {
    props.onchange(event.target.id);
  };

  const chart = [
    "bar chart",
    "line chart",
    "lollipop chart",
    "heatmap",
    "scatterplot",
    "violin chart",
    "area chart",
  ];
  const chartGraph = chart.map((ele: string) => {
    return (
      <div
        className="spanList"
        onClick={handleChange}
        id={ele as string}
        key={ele as string}
      >
        {ele.toUpperCase() as any}
      </div>
    );
  });
  return <div className="menu">{chartGraph}</div>;
};

export default Menu;
