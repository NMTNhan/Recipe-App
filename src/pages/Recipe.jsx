import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  },[params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
          Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
          Ingredients</Button>
          {activeTab === 'instructions' && (
            <div>
              <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
              <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>
          )}

          {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => 
            <li key={ingredient.id}>
              {ingredient.original}
            </li>)}
          </ul>
          )}

      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem;
  
  .active{
    background: linear-gradient(to right, #FFB76B 0%, #FFA73D 30%, #FF7C00 60%, #FF7F04 100%);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
    font-size: 3rem;
    text-align: center;

  }
  li{
    font-size:1.2rem;
    line-height: 2.5rem;
    font-weight: 100;
  }
  ul{
    margin-top: 2rem;
  }
  img {
    border: 2px solid black;
  }

`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  justify-content: center;
  text-align: center;
`

const Info = styled.div `
  margin-top: 5rem;
  margin-left:10rem;
`
export default Recipe