import React from "react";
import style from "./Donat.module.scss";
import Header from "Components/Header/Header";
import RightMenu from "Components/RightMenu/RightMenu";
import Footer from "Components/Footer/Footer";
// Images
import Creative from "../../images/Donat/Creative.png";
import vip from "../../images/Donat/vip.png";
import prem from "../../images/Donat/prem.png";
import admin from "../../images/Donat/admin.png";
import mainAdmin from "../../images/Donat/mainAdmin.png";
import lord from "../../images/Donat/lord.png";
import creator from "../../images/Donat/Creator.png";
import deputat from "../../images/Donat/Deputat.png";
import god from "../../images/Donat/God.png";
import youtuber from "../../images/Donat/youtuber.png";
import owner from "../../images/Donat/owner.png";
import rich from "../../images/Donat/rich.png";
import sponsor from "../../images/Donat/sponsor.png";
import legend from "../../images/Donat/legend.png";
import imperator from "../../images/Donat/imperator.png";
import millionair from "../../images/Donat/millionair.png";
import magnat from "../../images/Donat/magnat.png";
import samurai from "../../images/Donat/samurai.png";
import hero from "../../images/Donat/Hero.png";
import caseImg from "../../images/Donat/case.png";
// Anarchia
import anarchist from "../../images/Donat/Anarhia/Anarchist.png";
import destroyer from "../../images/Donat/Anarhia/destroyer.png";
import crazy from "../../images/Donat/Anarhia/crazy.png";
import nesluha from "../../images/Donat/Anarhia/nesluha.png";
import protest from "../../images/Donat/Anarhia/protest.png";
import radikal from "../../images/Donat/Anarhia/radikal.png";
import insurgent from "../../images/Donat/Anarhia/insurgent.png";
import bespokoiny from "../../images/Donat/Anarhia/bespokoiny.png";
import revolution from "../../images/Donat/Anarhia/revolution.png";

const Donat = ({ user, userIsLoaded }) => {
  const donatList = [
    {
      category: 'Выживание',
      items: [
        {
          img: Creative,
          title: "Креатив",
          bgColor: "2EEEF7",
          oldPrice: "190",
          newPrice: "55",
        },

        {
          img: vip,
          title: "ViP",
          bgColor: "FCC719",
          oldPrice: "99",
          newPrice: "29",
        },

        {
          img: prem,
          title: "Премиум",
          bgColor: "30727E",
          oldPrice: "329",
          newPrice: "99",
        },

        {
          img: admin,
          title: "Админ",
          bgColor: "944B21",
          oldPrice: "490",
          newPrice: "159",
        },

        {
          img: mainAdmin,
          title: "Главный Админ",
          bgColor: "79E9D9",
          oldPrice: "777",
          newPrice: "250",
        },

        {
          img: lord,
          title: "Лорд",
          bgColor: "F5B557",
          oldPrice: "999",
          newPrice: "379",
        },

        {
          img: creator,
          title: "Основатель",
          bgColor: "8FC35E",
          oldPrice: "1490",
          newPrice: "490",
        },

        {
          img: deputat,
          title: "Депутат",
          bgColor: "013478",
          oldPrice: "2350",
          newPrice: "799",
        },

        {
          img: god,
          title: "Бог",
          bgColor: "E8E8E6",
          oldPrice: "3300",
          newPrice: "999",
        },

        {
          img: youtuber,
          title: "Ютубер",
          bgColor: "930A0B",
          oldPrice: "4850",
          newPrice: "1600",
        },

        {
          img: owner,
          title: "Владелец",
          bgColor: "CCA05D",
          oldPrice: "6100",
          newPrice: "2290",
        },

        {
          img: rich,
          title: "Мажор",
          bgColor: "20A167",
          oldPrice: "7500",
          newPrice: "3250",
        },

        {
          img: sponsor,
          title: "Спонсор",
          bgColor: "30727E",
          oldPrice: "8700",
          newPrice: "3990",
        },

        {
          img: legend,
          title: "Легенда",
          bgColor: "F3E842",
          oldPrice: "9990",
          newPrice: "4950",
        },

        {
          img: imperator,
          title: "Император",
          bgColor: "900000",
          oldPrice: "10990",
          newPrice: "5000",
        },

        {
          img: millionair,
          title: "Миллионер",
          bgColor: "D9A224",
          oldPrice: "11400",
          newPrice: "5300",
        },

        {
          img: magnat,
          title: "Магнат",
          bgColor: "FBD74B",
          oldPrice: "12650",
          newPrice: "5600",
        },

        {
          img: samurai,
          title: "Самурай",
          bgColor: "A2032A",
          oldPrice: "13500",
          newPrice: "6750",
        },

        {
          img: hero,
          title: "Герой",
          bgColor: "0B7FEB",
          oldPrice: "15000",
          newPrice: "7500",
        },
      ],
    },

    {
      category: "Донат - ключи",
      items: [
        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 5,
          price: 25,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 10,
          price: 42,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 20,
          price: 75,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 30,
          price: 125,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 50,
          price: 190,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 100,
          price: 325,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 250,
          price: 550,
        },

        {
          img: caseImg,
          bgColor: "27CE4D",
          amount: 500,
          price: 875,
        },
      ],
    },

    {
      category: "Анархия",
      items: [
        {
          img: anarchist,
          title: "Анархист",
          bgColor: "FAC696",
          oldPrice: "129",
          newPrice: "59",
        },

        {
          img: destroyer,
          title: "Разрушитель",
          bgColor: "F6E045",
          oldPrice: "229",
          newPrice: "110",
        },

        {
          img: crazy,
          title: "Бунтарь",
          bgColor: "E3700B",
          oldPrice: "350",
          newPrice: "179",
        },

        {
          img: nesluha,
          title: "Неслуха",
          bgColor: "0B7FEB",
          oldPrice: "490",
          newPrice: "249",
        },

        {
          img: protest,
          title: "Протестующий",
          bgColor: "14264C",
          oldPrice: "750",
          newPrice: "379",
        },

        {
          img: radikal,
          title: "Радикал",
          bgColor: "14264C",
          oldPrice: "750",
          newPrice: "379",
        },

        {
          img: insurgent,
          title: "Инсургент",
          bgColor: "A90504",
          oldPrice: "1290",
          newPrice: "649",
        },

        {
          img: bespokoiny,
          title: "Беспокойный",
          bgColor: "189E4B",
          oldPrice: "1550",
          newPrice: "790",
        },

        {
          img: revolution,
          title: "Революционер",
          bgColor: "FF5938",
          oldPrice: "2000",
          newPrice: "990",
        },
      ],
    },
  ];

  // TODO: buy function with           -         !userIsLoaded || (userIsLoaded && !user)

  return (
    <div className={style.donat}>
      <div className={style.donat__banner}>
        <div className="container">
          <Header user={user} userIsLoaded={userIsLoaded} />
          <main className={style.donat__wrapper}>
            <div>
              <div className={style.donat__content__list}>
                {donatList.map((item) => (
                  <div className={style.donat__content}>
                    <h1>{item.category}</h1>

                    <ul>
                      {item.items.map((donat) => (
                        <li>
                          <h5>shilworld.ru</h5>

                          <div className={style.donat__image}>
                            <img
                              data-bg-color={donat.bgColor}
                              src={donat.img}
                              alt="donat"
                            />
                            <div style={{background: `#${donat.bgColor}`, width: '50%', height: "50%"}} />
                          </div>

                          {donat.amount ? (
                            <h4>Доант ключи {donat.amount} штук</h4>
                          ) : (
                            <h4>{donat.title}</h4>
                          )}

                          <div className={style.donat__price}>
                            <h2>Цена:</h2>

                            {donat.price ? (
                              <p className={style.donat__price__price}>
                                {donat.price}₽
                              </p>
                            ) : (
                              <div>
                                <p className={style.donat__price__old}>
                                  {donat.oldPrice}₽
                                </p>
                                <p className={style.donat__price__new}>
                                  {donat.newPrice}₽
                                </p>
                              </div>
                            )}
                          </div>

                          <form>
                            <input type="text" placeholder="Введи промо код" />
                            <button
                              disabled={
                                !userIsLoaded || (userIsLoaded && !user)
                              }
                            >
                              Купить
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <section className={style.donat__right__menu}>
              <RightMenu user={user} userIsLoaded={userIsLoaded} />
            </section>
          </main>

          <div className="footer">
            <div className={style.donat__footer}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donat;
