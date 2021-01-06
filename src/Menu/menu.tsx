import React from "react";
import "./menu.css";
import { useQuery } from "react-query";

const getPosts = async () => {
  console.log(".....");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};

function Abc(props) {
  // const { status, data, isFetching, error } = useQuery("posts", getPosts);
  // console.log("ff", status, data);
}
function Menu(props) {
  const handleChange = (event) => {
    console.log("..", event.target.id);
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
  const aa = chart.map((ele: any) => {
    return (
      <div className="spanList" onClick={handleChange} id={ele as any}>
        {ele as any}
      </div>
      // </div>
    );
  });
  return <div className="menu">{aa}</div>;
}

export default Menu;
