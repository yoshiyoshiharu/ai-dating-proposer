import { useState } from "react";

const Form = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      area: event.target.area.value,
    };

    const JSONdata = JSON.stringify(data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch('/api/client', options);

    const result = await response.json();
    alert(result.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="area">エリア</label>
        <input type="text" id="area" name="area"/>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form;
