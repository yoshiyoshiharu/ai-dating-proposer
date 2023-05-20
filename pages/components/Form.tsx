export default function Form() {
  return (
    <form action="/api/form" method="post">
      <label htmlFor="area">エリア</label>
      <input type="text" id="area" name="area"/>

      <button type="submit">Submit</button>
    </form>
  )
}
