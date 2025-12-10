import { useState, useEffect } from "react";
import moment from "moment";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import useAxios from "../../utils/useAxios";
import Useta from "../plugin/UserData";
import { teacherId } from "../../utils/constants";
import UserData from "../plugin/UserData";

function Earning() {
  const [stats, setStats] = useState([]);
  const [earning, setEarning] = useState([]);
  const [bestSellingCourse, setBestSellingCourse] = useState([]);

  useEffect(() => {
    useAxios()
      .get(`teacher/summary/${UserData()?.user_id}/`)
      .then((res) => {
        console.log(res.data[0]);
        setStats(res.data[0]);
      });

    useAxios()
      .get(`teacher/all-months-earning/${UserData()?.user_id}/`)
      .then((res) => {
        console.log(res.data);
        setEarning(res.data);
      });

    useAxios()
      .get(`teacher/best-course-earning/${UserData()?.user_id}/`)
      .then((res) => {
        console.log(res.data);
        setBestSellingCourse(res.data);
      });
  }, []);
  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="mb-0">Доходы</h3>
                  <p className="mb-0">
                    У вас есть полный контроль над управлением настройками вашей учетной записи.
                  </p>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Доходы</h4>
                  <div className="dropdown dropstart">
                    <a
                      className="btn-icon btn btn-ghost btn-sm rounded-circle"
                      href="#"
                      role="button"
                      id="paymentDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical" />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="paymentDropdown"
                    >
                      <span className="dropdown-header">Настройки</span>
                      <a className="dropdown-item" href="#">
                        30 дней
                      </a>
                      <a className="dropdown-item" href="#">
                        2 месяца
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3 mb-lg-0">
                      <div className="border p-3 rounded shadow-sm">
                        <i className="fe fe-shopping-cart icon-shape icon-sm rounded-3 bg-light-success text-dark-success mt-2" />
                        <h3 className="display-4 fw-bold mt-3 mb-0">
                          ${stats.total_revenue?.toFixed(2)}
                        </h3>
                        <span>Ежемесячный доход (январь)</span>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3 mb-lg-0">
                      <div className="border p-3 rounded shadow-sm">
                        <i className="fe fe-shopping-cart icon-shape icon-sm rounded-3 bg-light-success text-dark-success mt-2" />
                        <h3 className="display-4 fw-bold mt-3 mb-0">
                          ${stats.monthly_revenue?.toFixed(2)}
                        </h3>
                        <span>Ваш доход</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className="card mb-4">
                <div className="card-header border-bottom-0">
                  <h3 className="mb-0 h4">Самые продаваемые курсы</h3>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Курсы</th>
                        <th>Продажи</th>
                        <th>Сумма</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bestSellingCourse?.map((b, index) => (
                        <tr>
                          <td>
                            <a
                              href="#"
                              className="text-decoration-none text-dark"
                            >
                              <div className="d-flex align-items-center">
                                <img
                                  src={"http://127.0.0.1:8000" + b.course_image}
                                  alt={b.course_title}
                                  style={{
                                    width: "100px",
                                    height: "70px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  className="rounded img-4by3-lg"
                                />
                                <h5 className="mb-0 ms-3 ">{b.course_title}</h5>
                              </div>
                            </a>
                          </td>
                          <td>{b.sales}</td>
                          <td>${b.revenue}</td>
                          <td className="align-middle border-top-0">
                            <span className="dropdown dropstart">
                              <a
                                className="btn-icon btn btn-ghost btn-sm rounded-circle"
                                href="#"
                                role="button"
                                id="courseDropdown1"
                                data-bs-toggle="dropdown"
                                data-bs-offset="-20,20"
                                aria-expanded="false"
                              >
                                <i className="fe fe-more-vertical" />
                              </a>
                              <span
                                className="dropdown-menu"
                                aria-labelledby="courseDropdown1"
                              >
                                <span className="dropdown-header">Настройки</span>
                                <a className="dropdown-item" href="#">
                                  <i className="fe fe-edit dropdown-item-icon" />
                                  Редактировать
                                </a>
                                <a className="dropdown-item" href="#">
                                  <i className="fe fe-trash dropdown-item-icon" />
                                  Удалить
                                </a>
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card mb-4">
                {/* Card header */}
                <div className="card-header border-bottom-0">
                  <h3 className="h4 mb-3">История доходов</h3>
                </div>
                {/* Table */}
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Месяц</th>
                        <th>Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {earning?.map((e, index) => (
                        <tr key={index}>
                          <td>
                            {e.month === 1 && "Январь"}
                            {e.month === 2 && "Февраль"}
                            {e.month === 3 && "Март"}
                            {e.month === 4 && "Апрель"}
                            {e.month === 5 && "Май"}
                            {e.month === 6 && "Июнь"}
                            {e.month === 7 && "Июль"}
                            {e.month === 8 && "Август"}
                            {e.month === 9 && "Сентябрь"}
                            {e.month === 10 && "Октябрь"}
                            {e.month === 11 && "Ноябрь"}
                            {e.month === 12 && "Декабрь"}
                          </td>
                          <td>${e.total_earning?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Earning;
