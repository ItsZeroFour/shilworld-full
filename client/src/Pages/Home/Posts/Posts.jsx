import React, { useEffect, useState } from "react";
import style from "./Posts.module.scss";
import img from "../../../images/background.webp";
// import frame from "../../../images/Home/frame.webp";
import ReactPaginate from "react-paginate";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "redux/slices/post";
import { Link } from "react-router-dom";

const Posts = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [postsItems, setPostsItems] = useState([]);
  const { posts } = useSelector((state) => state.posts);
  const itemsPerPage = 4;

  const disptach = useDispatch();

  useEffect(() => {
    setPostsItems(posts.items);
  }, [posts]);

  useEffect(() => {
    disptach(fetchPosts());
  }, [disptach]);

  /* PAGINATION FUCTIONS */
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(postsItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(postsItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, postsItems]);

  const onPageChangeClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % postsItems.length;
    console.log("f");
    setItemOffset(newOffset);
  };

  return (
    <section className={style.posts}>
      <ul className={style.posts__list}>
        {currentItems &&
          currentItems.map((item, index) => (
            <li className={style.post__item} key={index}>
              <a href={item.link} target="_blank">
                <div className={style.post__item__text__content}>
                  <h1 className={style.post__title}>{item.title}</h1>
                  <h1 className={style.post__item__subtitle}>
                    {item.subtitle}
                  </h1>

                  <div className={style.post__item__bottom}>
                    <h2>ShilWorld.ru</h2>
                  </div>
                </div>

                <div className={style.post__item__image}>
                  {/* <img className={style.post__item__frame} src={frame} alt="frame" /> */}
                  <img
                    className={style.post__item__img}
                    src={process.env.REACT_APP_API_URL + item.image}
                    alt="post"
                  />
                </div>
              </a>
            </li>
          ))}
      </ul>

      <div className={style.posts__pagination}>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <p>
              Вперед <BsArrowRight />
            </p>
          }
          onPageChange={onPageChangeClick}
          pageRangeDisplayed={window.screen.width > 570 ? 5 : 2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={
            <p>
              <BsArrowLeft /> Назад
            </p>
          }
          renderOnZeroPageCount={null}
          /* CLASSES */
          containerClassName={style.pagination__container}
          pageLinkClassName={style.pagination__link}
          previousClassName={style.pagination__prev}
          nextClassName={style.pagination__next}
          activeLinkClassName={style.pagination__active}
          breakClassName={style.pagination__break}
        />
      </div>
    </section>
  );
};

export default Posts;
