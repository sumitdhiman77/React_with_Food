import menu from "../src/data/menu_207611.json";

console.log(menu);
export default function handler() {
  res.status(200).json(menu);
}
