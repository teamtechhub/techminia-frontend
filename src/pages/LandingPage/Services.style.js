import styled from "styled-components";

export const Container = styled.div`
  clear: both;
  position: relative;
  padding: 30px 0;
  font-size: 14px;
  color: #fff;
  bottom: 0;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export const Card = styled.div`
  .cards {
    width: 100%;
    height: 400px;
    display: block;
    background-size: cover;
    float: left;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    background-position: center;
  }
  .img-responsive {
    height: 100%;
  }

  .card__service {
    position: relative;
    z-index: 10;

    &:hover {
      .card__service__rect-1 {
        left: 10%;

        .shadow-1 {
          left: -20%;
        }
      }

      .card__service__rect-2 {
        left: 60%;

        &:before {
          left: -100%;
        }

        &:after {
          left: 80%;
        }

        .shadow-2 {
          left: -10%;
        }
      }

      .card__service__circle {
        transform: scale(1);

        &:before {
          transform: scale(0.9);
        }
      }

      .card__service__list {
        li {
          transform: translateX(0);
        }
      }
    }

    &__rect-1 {
      background: #fff;
      width: 200px;
      height: 110px;
      transform: skewX(-20deg);
      display: block;
      position: absolute;
      top: 73%;
      opacity: 0.9;
      left: -100%;
      z-index: 8;
      transition: all 0.5s ease-in;

      p {
        font-size: 14px;
        color: #fff;
        transform: skewX(20deg);
        position: relative;
        top: 40%;
        // line-height: 6rem;
      }

      .shadow-1 {
        background: #652e8d;
        width: 230px;
        height: 100px;
        display: block;
        position: absolute;
        left: -200%;
        z-index: -1;
        transition: all 0.3s ease-in;
      }
    }

    &__rect-2 {
      width: 100px;
      height: 70px;
      background: #fff;
      position: absolute;
      top: 65%;
      left: 1000%;
      opacity: 0.9;
      transform: skewX(-20deg);
      z-index: 8;
      transition: all 0.5s ease-in;

      &::before {
        content: "";
        display: block;
        width: 50px;
        height: 40px;
        background: #ec7623;
        opacity: 1;
        position: absolute;
        left: 500%;
        top: 10%;
        transition: all 0.3s ease-in;
      }

      &::after {
        content: "";
        display: block;
        width: 50px;
        height: 40px;
        background: #652e8d;
        opacity: 1;
        position: absolute;
        left: 500%;
        top: 114%;
        transition: all 0.5s ease-in;
        transition-delay: 0.2s;
      }

      .shadow-2 {
        background: #ec7623;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: -10%;
        left: 500%;
        transition: all 0.5s ease-in;
        transition-delay: 0.2s;
      }
    }

    &__circle {
      width: 220px;
      height: 150px;
      background: #fff;
      position: absolute;
      top: -15%;
      left: 30%;
      opacity: 0.9;
      transform: skewX(-20deg);
      transform: scale(0);
      transition: all 0.3s ease;

      &:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #652e8d;
        transform: skewX(-20deg);
        transform: scale(0);
        transition: all 0.3s ease;
        transition-delay: 0.2s;
      }
    }

    &__list {
      list-style: none;
      position: absolute;
      top: -50px;
      right: 75px;
      padding-top: 60px;
      transition: all 0.4s ease;

      li {
        display: inline-block;
        margin: 4px;
        color: #fff;
        width: 137px;
        border-radius: 50%;
        // background: #ec7623;
        text-align: center;
        line-height: 1.7rem;
        font-size: 12px;
        transition: all 0.3s ease;
        transform: translateX(500%);
        > h5 {
          position: relative;
          top: 50%;
        }

        &:nth-child(1) {
          transition-delay: 0.2s;
        }

        &:nth-child(2) {
          transition-delay: 0.3s;
        }

        &:nth-child(3) {
          transition-delay: 0.4s;
        }
      }
    }
  }
`;
