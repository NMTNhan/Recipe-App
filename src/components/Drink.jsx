import { useEffect, useState } from "react";
import styled from "styled-components";
import  {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
import { BiSolidDrink } from "react-icons/bi";




function Drink() {
  
  const [drink, setDrink] = useState([]);

  useEffect(() => {
      getDrink();
  },[]);

  const getDrink = async () => {


      const check = localStorage.getItem('drink');
      if (check){
          setDrink(JSON.parse(check));
      } else{
          const api = await fetch(
              `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=drink`
          );
          const data = await api.json();

          localStorage.setItem('drink', JSON.stringify(data.recipes));
          setDrink(data.recipes);
          console.log(data.recipes);
      }

     

  };

  return (
    <div>
    <Wrapper>
        <h3>Popular drink <BiSolidDrink/></h3>

        <Splide options={{
            perPage: 4,
            arrows: false,
            pagination:false,
            drag: 'free',
            gap: '5rem',
        }}>
        {drink.map ((recipe) => {
            return (
                <SplideSlide key={recipe.id}>
                <Card>
                    <Link to={'/recipe/'+recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient/>
                    </Link>
                </Card>
                </SplideSlide>
            );
        })}
        </Splide>
    </Wrapper>

</div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    borde-radius: 2rem;
    overflow: hidden;
    position: relative;


    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        text-shadow: 0px 0px 17px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rbga(0,0,0,0), rgba(0,0,0,0.5)));
`

export default Drink