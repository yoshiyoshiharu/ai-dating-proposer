

const Form = () => {

  return (
    <>
      <form action="/api/form" method="get">
        <label htmlFor="area">エリア</label>
        <input type="text" id="area" name="area"/>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form;
