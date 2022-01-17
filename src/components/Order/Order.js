import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredents = [];

  for (let ingredentName in props.ingredents) {
    ingredents.push({
      name: ingredentName,
      // amount: props.indredents[ingredentName]
    });
  }
  const ingredentOutput = ingredents.map((ig) => {
    return (
      <span>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredents: {ingredentOutput}</p>
      <p>
        Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
