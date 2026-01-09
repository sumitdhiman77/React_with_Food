import menu from "../../public/data";

console.log(menu);
export default function handler(req, res) {
  res.status(200).json(menu);
}
