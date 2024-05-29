import { useEffect, useState, useContext } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

import useAxios from "../../utils/useAxios";
import CartId from "../plugin/CartId";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import Toast from "../plugin/Toast";
import { CartContext } from "../plugin/Context";
import apiInstance from "../../utils/axios";

function Index() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useContext(CartContext);

  const country = GetCurrentAddress().country;
  const userId = UserData()?.user_id;
  const cartId = CartId();

  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      await useAxios()
        .get(`/course/course-list/`)
        .then((res) => {
          setCourses(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const addToCart = async (courseId, userId, price, country, cartId) => {
    const formdata = new FormData();

    formdata.append("course_id", courseId);
    formdata.append("user_id", userId);
    formdata.append("price", price);
    formdata.append("country_name", country);
    formdata.append("cart_id", cartId);

    try {
      await useAxios()
        .post(`course/cart/`, formdata)
        .then((res) => {
          console.log(res.data);
          Toast().fire({
            title: "Added To Cart",
            icon: "success",
          });

          // Set cart count after adding to cart
          apiInstance.get(`course/cart-list/${CartId()}/`).then((res) => {
            setCartCount(res.data?.length);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


  const addToWishlist = (courseId) => {
    const formdata = new FormData();
    formdata.append("user_id", UserData()?.user_id);
    formdata.append("course_id", courseId);

    useAxios()
      .post(`student/wishlist/${UserData()?.user_id}/`, formdata)
      .then((res) => {
        console.log(res.data);
        Toast().fire({
          icon: "success",
          title: res.data.message,
        });
      });
  };

  return (
    <>
      <BaseHeader />

      <section className="py-lg-8 py-5">
        {/* container */}
        <div className="container my-lg-8">
          {/* row */}
          <div className="row align-items-center">
            {/* col */}
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div>
                {/* heading */}
                <h5 className="text-dark mb-4">
                  <i className="fe fe-check icon-xxs icon-shape bg-light-success text-success rounded-circle me-2" />
                  Самая надежная образовательная платформа
                </h5>
                {/* heading */}
                <h1 className="display-3 fw-bold mb-3">
                  Развивайте свои навыки и карьерьеру
                </h1>
                {/* para */}
                <p className="pe-lg-10 mb-5">
                  Начните, смените или продвиньте свою карьеру с более чем 5000
                  курсы, профессиональные сертификаты и степени от
                  университеты и компании мирового уровня.
                </p>
                {/* btn */}
                <a href="#" className="btn btn-primary fs-4 text-inherit ms-3">
                  Присоединяйтесь бесплатно<i className="fas fa-plus"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-success fs-4 text-inherit ms-3"
                >
                  Демо <i className="fas fa-video"></i>
                </a>
              </div>
            </div>
            {/* col */}
            <div className="col-lg-6 d-flex justify-content-center">
              {/* images */}
              <div className="position-relative">
                <img
                  src="https://geeksui.codescandy.com/geeks/assets/images/background/acedamy-img/girl-image.png"
                  alt="girl"
                  className="end-0 bottom-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mb-lg-8">
          {/* row */}
          <div className="row mb-5">
            <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
              {/* text */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-award fs-2 text-info" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">316,000+</h2>
                  <span>Квалифицированный инструктор</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-users fs-2 text-warning" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">1,8 млрд.+</h2>
                  <span>Записей на курсы</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-tv fs-2 text-primary" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">41,000+</h2>
                  <span>Курсы на 42 языках</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg border-top">
              {/* icon */}
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fe fe-film fs-2 text-success" />
                </div>
                {/* text */}
                <div className="lh-1">
                  <h2 className="mb-1">179,000+</h2>
                  <span>Видео курсов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            {/* col */}
            <div className="col-12">
              <div className="mb-6">
                <h2 className="mb-1 h1">🔥Самые популярные курсы</h2>
                <p>
                  Это самые популярные курсы среди Geeks Courses.
                  учащихся во всем мире в 2022 году
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {currentItems?.map((c, index) => (
                  <div className="col">
                    {/* Card */}
                    <div className="card card-hover">
                      <Link to={`/course-detail/${c.slug}/`}>
                        <img
                          src={c.image}
                          alt="course"
                          className="card-img-top"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <span className="badge bg-info">{c.level}</span>
                            <span className="badge bg-success ms-2">
                              {c.language}
                            </span>
                          </div>
                          <a onClick={() => addToWishlist(c.id)} className="fs-5">
                            <i className="fas fa-heart text-danger align-middle" />
                          </a>
                        </div>
                        <h4 className="mb-2 text-truncate-line-2 ">
                          <Link
                            to={`/course-detail/slug/`}
                            className="text-inherit text-decoration-none text-dark fs-5"
                          >
                            {c.title}
                          </Link>
                        </h4>
                        <small>{c.teacher.full_name}</small> <br />
                        <small>
                          {c.students?.length} Студент
                          {c.students?.length > 1 && "s"}
                        </small>{" "}
                        <br />
                        <div className="lh-1 mt-3 d-flex">
                          <span className="align-text-top">
                            <span className="fs-6">
                              <Rater total={5} rating={c.average_rating || 0} />
                            </span>
                          </span>
                          <span className="text-warning">4.5</span>
                          <span className="fs-6 ms-2">
                            ({c.reviews?.length} Отзывы)
                          </span>
                        </div>
                      </div>
                      {/* Card Footer */}
                      <div className="card-footer">
                        <div className="row align-items-center g-0">
                          <div className="col">
                            <h5 className="mb-0">${c.price}</h5>
                          </div>
                          <div className="col-auto">
                            <button
                              type="button"
                              onClick={() =>
                                addToCart(
                                  c.id,
                                  userId,
                                  c.price,
                                  country,
                                  cartId
                                )
                              }
                              className="text-inherit text-decoration-none btn btn-primary me-2"
                            >
                              <i className="fas fa-shopping-cart text-primary text-white" />
                            </button>
                            <Link
                              to={""}
                              className="text-inherit text-decoration-none btn btn-primary"
                            >
                              Зарегистрируйтесь сейчас{" "}
                              <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <nav className="d-flex mt-5">
                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link me-1"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className="ci-arrow-left me-2" />
                      Предыдущий
                    </button>
                  </li>
                </ul>
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${currentPage === number ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>

                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link ms-1"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Следующий
                      <i className="ci-arrow-right ms-3" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="my-8 py-lg-8">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
            {/* col */}
            <div className="col-lg-6 col-12 d-none d-lg-block">
              <div className="d-flex justify-content-center pt-4">
                {/* img */}
                <div className="position-relative">
                  <img
                    src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                    alt="image"
                    className="img-fluid mt-n8"
                  />
                  <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg"
                      alt="dollor"
                    />
                  </div>
                  {/* img */}
                  <div className="me-n4 position-absolute top-0 end-0">
                    <img
                      src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg"
                      alt="graph"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div className="text-white p-5 p-lg-0">
                {/* text */}
                <h2 className="h1 text-white">Станьте инструктором сегодня</h2>
                <p className="mb-0">
                  Преподаватели со всего мира обучают миллионы студентов
                  на Гиках. Мы предоставляем инструменты и навыки, чтобы научить тому, чему вы
                  любовь.
                </p>
                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                  Начните преподавать сегодня <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 pt-8 pb-8 mt-5">
        <div className="container pb-8">
          {/* row */}
          <div className="row mb-lg-8 mb-5">
            <div className="offset-lg-1 col-lg-10 col-12">
              <div className="row align-items-center">
                {/* col */}
                <div className="col-lg-6 col-md-8">
                  {/* rating */}
                  <div>
                    <div className="mb-3">
                      <span className="lh-1">
                        <span className="align-text-top ms-2">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </span>
                        <span className="text-dark fw-semibold">4.5/5.0</span>
                      </span>
                      <span className="ms-2">(Based on 3265 ratings)</span>
                    </div>
                    {/* heading */}
                    <h2 className="h1">Что говорят наши студенты</h2>
                    <p className="mb-0">
                      Послушайте
                      <span className="text-dark">учителей</span>,
                      <span className="text-dark">тренеров</span> и
                      <span className="text-dark">лидеров</span>
                        образовательной сферы о том, как гики помогают им
                        обеспечить качественный опыт онлайн-обучения.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 text-md-end mt-4 mt-md-0">
                  {/* btn */}
                  <a href="#" className="btn btn-primary">
                    Посмотреть обзоры
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* row */}
          <div className="row">
            {/* col */}
            <div className="col-md-12">
              <div className="position-relative">
                {/* controls */}
                {/* slider */}
                <div className="sliderTestimonial">
                  {/* item */}
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                              “Проходила курс от PYTHON-31 по профессии Финансовый менеджер, 
                              дополнительно мне дали курс в подарок Таргетолог с нуля, курс очень классный, 
                              все прошла на легке, перед тем, как выбрать читала много положительных отзывов о 
                              курсе, темы максимально глубокие, что очень важно.
                              По таргету хорошо составленная программа, преподаватели PYTHON-31 — профессионалы 
                              своего дела, занятия всегда на доступном языке, много полезной информации, 
                              кураторы проверят быстро домашние задания, поясняют ошибки. Здорово что можно 
                              изменить свою профессию за несколько месяцев. И самое важное это то, что можно 
                              учиться в любое время и с любой точки мира. Для тех, кто ведет собственный бизнес — 
                              много полезной информации. Качество обучения на высшем уровне.
                              По Финансовому менеджеру пройдя обучение за год, подумала, что не мое, 
                              много инфы, которая не для меня, пришлось написать в техподдержку, в итоге 
                              мне заменили курс на более мне подходящий, без проблем. Честно, уверена была, 
                              что никто не станет возиться с заменой курса, спасибо, что все так 
                              замечательного организовано.
                              Школа супер, все рекомендую, лояльные менеджеры!”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Игнат Стрельников</h3>
                            <span>Финансист в Yandex</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                              “Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, dicta eum iure quasi exercitationem ipsa porro natus quo soluta recusandae? Aliquam, libero. Rerum expedita voluptas, odit repellat debitis obcaecati soluta.”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Николай Полежаев</h3>
                            <span>Инжинер-программист Mail Group</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item">
                        <div className="card">
                          <div className="card-body text-center p-6">
                            {/* img */}
                            <img
                              src="https://geeksui.codescandy.com/geeks/assets/images/png/cta-instructor-1.png"
                              alt="avatar"
                              className="avatar avatar-lg rounded-circle"
                            />
                            <p className="mb-0 mt-3">
                            “Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus earum, fugit illum dolores aperiam odio voluptates porro perferendis ex eum. Inventore culpa earum harum fugit quas. Nobis dolore et quasi.”
                            </p>
                            {/* rating */}
                            <div className="lh-1 mb-3 mt-4">
                              <span className="fs-6 align-top">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={11}
                                  height={11}
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning">5</span>
                              {/* text */}
                            </div>
                            <h3 className="mb-0 h4">Глеб Галушкин</h3>
                            <span>Системный-инженер в Binance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Index;
