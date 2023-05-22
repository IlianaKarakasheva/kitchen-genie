import React from "react";

export default function About() {
  return (
    <div className="container">
      <div className="col-lg-8 col-md-10 mx-auto">
        <h3>Welcome to KitchenGenie!</h3>
        <p className="lead">
          Our website is dedicated to providing you with delicious and healthy
          recipes that you can easily prepare at home. We believe that cooking
          at home is not only a great way to ensure that you are eating
          nutritious meals, but it is also a fun and rewarding activity that you
          can share with your friends and family.
        </p>
        <p className="lead">
          Whether you are a seasoned home cook or just starting out, we have
          recipes that will suit your needs. From quick and easy meals that you
          can prepare in 30 minutes or less to elaborate dishes that are perfect
          for special occasions, we have something for everyone. We also
          understand that dietary restrictions can be a challenge when it comes
          to finding tasty recipes. That's why we have a wide selection of
          special diet recipes that cater to a variety of preferences and needs.
        </p>
        <p className="lead">
          Thank you for visiting our site, and we hope that you enjoy our
          recipes as much as we do! If you have any questions or feedback,
          please don't hesitate to get in touch with us.
        </p>
        <style jsx>{`
          h3 {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 27px;
            color: #333;
            padding-top: 27px;
          }
          .lead {
            font-size: 1.5rem;
            line-height: 2rem;
            margin-bottom: 2rem;
            color: #777;
          }
          p {
            font-size: 1rem;
            line-height: 1.8rem;
            margin-bottom: 1.5rem;
            color: #444;
          }
        `}</style>
      </div>
    </div>
  );
}
